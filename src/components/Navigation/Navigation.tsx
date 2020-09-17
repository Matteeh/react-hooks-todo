import React, { useState } from "react";
import "./Navigation.css";
import { Button, Card, Form, Navbar } from "react-bootstrap";

export function Navigation(props: any) {
  const { onSignOut } = props;
  return (
    <Navbar className="navbar">
      <Navbar.Brand href="#home">React Todo App</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as:{" "}
          <a href="#login">{window.localStorage.getItem("email")}</a>
        </Navbar.Text>
        <Button className="sign-out-btn" onClick={() => onSignOut()}>
          {" "}
          Sign out
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
