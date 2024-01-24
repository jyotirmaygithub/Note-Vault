import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button} from "react-bootstrap";
import Alert from "../components/Alerts"

export default function SignUp() {
  const [combinedState, setCombinedState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [alertState,setAlertState] = useState(false)
  const [details,setDetails] = useState({look : "",des : ""})
  const Navigation = useNavigate();

  function onchange(e) {
    setCombinedState({ ...combinedState, [e.target.name]: e.target.value });
  }

  async function handlesubmit(e) {
    e.preventDefault();
    console.log(combinedState);
    await handleCreateUser(
      combinedState.username,
      combinedState.email,
      combinedState.password
    );
  }

  async function handleCreateUser(name, email, password) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      
      if (!response.ok) {
        alert("Invalid");
        setAlertState(true)
        setDetails({look : "danger" , des : "Invalid credentials"})
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const userAuth_Token = await response.json();
      if (userAuth_Token) { 
        setDetails({look : "success" , des : "valid credentials"})
        setAlertState(true)
        document.cookie = userAuth_Token.auth_token;
        setTimeout(() => {
          
        }, 1000);
        setTimeout(() => {
          Navigation(`/`);
        }, 1500);
      } else {
        alert("Invalid");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <div className="sign-in__wrapper">
      {alertState && <Alert looks={details.look} des={details.des}/>}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handlesubmit}>
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
        <Button className="w-100" variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    </div>
  );
}
