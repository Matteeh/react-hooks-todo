import React, { useState } from "react";
import "./ConfirmationModal.css";
import { Button, Modal } from "react-bootstrap";

export function ConfirmationModal(props: any) {
  const { title, message, onDeleteClick, ...rest } = props;

  return (
    <Modal
      {...rest}
      animation={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>Selected Todo: {title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
        <Button onClick={() => onDeleteClick()} variant="danger">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
