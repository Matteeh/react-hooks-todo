import React from "react";
import "./TodoTable.css";
import { Button, Card } from "react-bootstrap";
import Table from "react-bootstrap/esm/Table";
import { Todo } from "../../models/Todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faUserClock } from "@fortawesome/free-solid-svg-icons";

export function TodoTable(props: any) {
  const { todos, onEdit, onDelete } = props;

  const getTodos = (todos: Todo[]) => {
    if (!todos) {
      return (
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    return todos.map((todo: Todo) => {
      return (
        <tr key={todo.id}>
          <td>{todo.name}</td>
          <td>{todo.description}</td>
          <td>
            <FontAwesomeIcon
              icon={todo.completed ? faCheck : faUserClock}
              color={todo.completed ? "#28a745" : "orange"}
            />
          </td>
          <td>
            <Button onClick={() => onEdit(todo)}>Edit</Button>
          </td>
          <td>
            <Button onClick={() => onDelete(todo)} variant="danger">
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="todo-table-container">
      <Card>
        <Card.Header>
          <h2>Todos</h2>
        </Card.Header>
        <Table striped bordered hover style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Is Complete</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{getTodos(todos)}</tbody>
        </Table>
      </Card>
    </div>
  );
}
