import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function CustomNavbar() {
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <Navbar className='bg-gray-200' expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">Task-Hub</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "text-black" : ""}`}>About</Link>
            <Link to="/contact" className={`nav-link ${location.pathname === "/contact" ? "text-black" : ""}`}>Contact</Link>
          </Nav>
          <Nav>
            <Link to="#login" className="nav-link">Login</Link>
            <Link to="#signup" className="nav-link">Sign Up</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
