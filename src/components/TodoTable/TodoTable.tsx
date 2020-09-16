import React from "react";
import "./TodoTable.css";
import { Card } from "react-bootstrap";
import Table from "react-bootstrap/esm/Table";
import { Todo } from "../../models/Todo";

export function TodoTable(props: any) {
  const { todos } = props;

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
          <td>{todo.isComplete}</td>
        </tr>
      );
    });
  };

  return (
    <div className="todo-table-container">
      <Card>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>IsComplete</th>
            </tr>
          </thead>
          <tbody>{getTodos(todos)}</tbody>
        </Table>
      </Card>
    </div>
  );
}
