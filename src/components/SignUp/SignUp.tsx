import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SignUp.css";
import { Link } from "react-router-dom";

const URL = "https://cosmosauthmicroservice.azurewebsites.net/api/auth/sign-in"; //"http://localhost:5000/api/auth/sign-in";

export function SignUp(props: any) {
  const { onSubmit } = props;
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  return (
    <div className="sign-up-container">
      <Card className="sign-up-card">
        <Card.Body>
          <Form
            id="userSignUpForm"
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
            <div className="sign-up-button-container">
              <Button
                className="sign-up-button"
                variant="primary"
                type="submit"
                form="userSignUpForm"
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </Card.Body>
        <Card.Footer className="footer">
          <b>Already have an account ?</b> <Link to="/sign-in"> Sign In </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}
