import React, { useState } from "react";
import "./ConfirmationModal.css";
import { Button, Modal } from "react-bootstrap";

export function ConfirmationModal(props: any) {
  const { title, message, onDeleteClick, ...rest } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Modal
      {...rest}
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose} variant="secondary">
          Close
        </Button>
        <Button onClick={() => onDeleteClick()} variant="danger">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
