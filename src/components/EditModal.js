// EditModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function EditModal({ showModal, handleCloseModal }){
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            autoFocus
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        Close
      </Button>
      <Button variant="primary" onClick={handleCloseModal}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

