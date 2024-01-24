import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Alert from "../components/Alerts";

export default function Login() {
  const [combinedState, setCombinedState] = useState({
    email: "",
    password: "",
  });
  const [alertState, setAlertState] = useState(false);
  const [details, setDetails] = useState({ look: "", des: "" });
  const Navigation = useNavigate();

  function alertRemoval() {
    setTimeout(() => {
      setAlertState(false);
    }, 1500);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleExistingUser(combinedState.email, combinedState.password);
  };

  function onchange(e) {
    setCombinedState({ ...combinedState, [e.target.name]: e.target.value });
  }

  // API call : existing user log in.
  async function handleExistingUser(email, password) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        setAlertState(true);
        setDetails({ look: "danger", des: "Invalid credentials" });
        alertRemoval();
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userAuth_Token = await response.json();
      if (userAuth_Token) {
        setDetails({ look: "success", des: "valid credentials" });
        setAlertState(true);
        document.cookie = userAuth_Token.auth_token;
        alertRemoval();
        setTimeout(() => {
          Navigation(`/`);
        }, 2500);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  return (
    <div className="sign-in__wrapper">
      <div>
      {alertState && <Alert looks={details.look} des={details.des} />}
      </div>
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
}
