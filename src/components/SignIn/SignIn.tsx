import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SignIn.css";
import { Link } from "react-router-dom";

export function SignIn(props: any) {
  const { onSubmit } = props;
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  return (
    <div className="sign-in-container">
      <Card className="sign-in-card">
        <Card.Body>
          <Form
            id="userSignInForm"
            onSubmit={(e) => {
              e.preventDefault();
              return onSubmit(enteredEmail, enteredPassword);
            }}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
              />
            </Form.Group>
            <div className="sign-in-button-container">
              <Button
                className="sign-in-button"
                variant="primary"
                type="submit"
                form="userSignInForm"
              >
                Sign in
              </Button>
            </div>
          </Form>
        </Card.Body>
        <Card.Footer className="footer">
          <b>New Here ?</b> <Link to="/sign-up"> Sign Up </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}
