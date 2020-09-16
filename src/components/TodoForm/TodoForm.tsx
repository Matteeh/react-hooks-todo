import React, { useState } from "react";
import "./TodoForm.css";
import { Button, Card, Form } from "react-bootstrap";

export function TodoForm(props: any) {
  const { onSubmit } = props;
  const [enteredName, setEnteredName] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredIsComplete, setIsComplete] = useState(false);

  const cleanUponSubmit = () => {
    setEnteredName("");
    setEnteredDescription("");
    setIsComplete(false);
  };

  return (
    <div className="todo-form-container">
      <Card className="todo-form-card">
        <Card.Body>
          <Form
            id="todoForm"
            className="todo-form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(enteredName, enteredDescription, enteredIsComplete);
              return cleanUponSubmit();
            }}
          >
            <Form.Group controlId="formBasicText">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={enteredName}
                onChange={(e) => setEnteredName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicText">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={enteredDescription}
                onChange={(e) => setEnteredDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicCheckbox"
              className="todo-form-check-grp"
            >
              <Form.Check
                type="checkbox"
                label="Completed"
                checked={enteredIsComplete}
                onChange={(e: any) => setIsComplete(e.target.value)}
              />
            </Form.Group>

            <div className="todo-form-btn-container">
              <Button
                className="submit-form-btn"
                variant="primary"
                type="submit"
                form="todoForm"
              >
                Create Todo
              </Button>
            </div>
          </Form>
        </Card.Body>
        <Card.Footer className="footer"></Card.Footer>
      </Card>
    </div>
  );
}
