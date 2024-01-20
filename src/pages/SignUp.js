import React, { useState,useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { UserNotes } from "../Context/NoteContext";
// import "./login.css";
// import BackgroundImage from "../../assets/images/background.png";
// import Logo from "../../assets/images/logo.png";

export default function SignUp() {
    const {handleCreateUser} = UserNotes()
    const [combinedState,setCombinedState] = useState({username : "",email : "",password : ""})

    function onchange(e){
        setCombinedState({...combinedState,[e.target.name] : e.target.value})
    }
    function handlesubmit(e){
        e.preventDefault()
        handleCreateUser(combinedState.username,combinedState.email,combinedState.password)
    }
  return (
    <div
      className="sign-in__wrapper"
      //   style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded">
        <div className="h4 mb-2 text-center">Create an account</div>
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            // value={combinedState.username}
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
            // value={combinedState.email}
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
            // value={combinedState.password}
            placeholder="Password"
            onChange={onchange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
          <Button className="w-100" variant="primary" type="submit" onClick={handlesubmit}>
            Sign In
          </Button>
      </Form>
    </div>
  );
}
