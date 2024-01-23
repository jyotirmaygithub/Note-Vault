import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";


export default function Login(){
  const [combinedState,setCombinedState] = useState({email:"",password : ""})

  // API call : existing user log in.
  async function handleExistingUser(email,password) {
    try {
      const response = await fetch(`${process.env.REACT_APP_DEV_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password}),
      });
      if (!response.ok) {
        alert("invalid")
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let jsondata = await response.json()
      if(jsondata){
        document.cookie = jsondata.auth_token
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleExistingUser(combinedState.email,combinedState.password)
  };

  function onchange(e){
    setCombinedState({...combinedState,[e.target.name]: e.target.value})
  }


  return (
    <div
      className="sign-in__wrapper"
    >
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center">Sign In</div>
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
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
       
        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={"something"}
          >
            Forgot password?
          </Button>
        </div>
      </Form>
    </div>
  );
};
