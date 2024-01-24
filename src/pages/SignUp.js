import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function SignUp() {
  const [combinedState, setCombinedState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const Navigation = useNavigate();
  
  function onchange(e) {
    setCombinedState({ ...combinedState, [e.target.name]: e.target.value });
  }
  function handlesubmit(e) {
    e.preventDefault();
    console.log(combinedState)
    handleCreateUser(
      combinedState.username,
      combinedState.email,
      combinedState.password
    );
  }


  // API call : To create a new user.
  async function handleCreateUser(username, email, password) {
    console.log(process.env.REACT_APP_JWT_SECRET)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );
      if (!response.ok) {
        alert("invalid")
        throw new Error(`${response.outcome} HTTP error! Status: ${response.status}`);
      }
      let userAuth_Token = await response.json();
      console.log("Auth token : ", userAuth_Token);
      if (userAuth_Token.outcome) {
        document.cookie = userAuth_Token.auth_token;
        setTimeout(() => {
          Navigation(`/`)        
        }, 1000);
      }
      else{
        alert("invalid")
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  return (
    <div className="sign-in__wrapper">
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded " onSubmit={handlesubmit}>
        <div className="h4 mb-2 text-center">Create an account</div>
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Username"
            onChange={onchange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Email"
            onChange={onchange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={onchange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button
          className="w-100"
          variant="primary"
          type="submit"
        >
          Sign In
        </Button>
      </Form>
    </div>
  );
}
