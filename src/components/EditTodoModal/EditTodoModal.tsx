import React, { useState, useEffect } from "react";
import "./EditTodoModal.css";
import { Button, Form, Modal } from "react-bootstrap";
import TodoForm from "../TodoForm";

export function EditTodoModal(props: any) {
  const { title, oldTodo, onSubmit, ...rest } = props;
  const [enteredName, setEnteredName] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredIsComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (oldTodo) {
      setEnteredName(oldTodo.name || "");
      setEnteredDescription(oldTodo.description || "");
      setIsComplete(oldTodo.isCompleted || "");
    }
  }, [oldTodo.id]);

  const cleanUponSubmit = () => {
    setEnteredName("");
    setEnteredDescription("");
    setIsComplete(false);
  };

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header>
        <Modal.Title>Selected Todo to edit: {title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          id="editTodoForm"
          className="todo-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(enteredName, enteredDescription, enteredIsComplete);
            return cleanUponSubmit();
          }}
        >
          <Form.Group controlId="editTodoFormBasicText">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="editTodoFormBasicText">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={enteredDescription}
              onChange={(e) => setEnteredDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            controlId="editTodoFormBasicCheckbox"
            className="todo-form-check-grp"
          >
            <Form.Check
              type="checkbox"
              label="Completed"
              checked={enteredIsComplete}
              onChange={(e: any) => setIsComplete(!enteredIsComplete)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
        <Button type="submit" form="editTodoForm" variant="primary">
          Submit edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
