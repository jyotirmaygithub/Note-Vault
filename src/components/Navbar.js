// import React, {Link} from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const App = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand to="/">Task-Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#login">Login</Nav.Link>
            <Nav.Link href="#signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default App;
