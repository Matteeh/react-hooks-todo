import React, { useState, useEffect } from "react";
import TodoForm from "../TodoForm";
import TodoTable from "../TodoTable";
import ConfirmationModal from "../ConfirmationModal";
import { http } from "../../helpers/http";
import { Todo } from "../../models/Todo";

const URL = "https://cosmostodosmicroservice.azurewebsites.net/api";

export function Home(props: any) {
  const [todos, setTodos] = useState([] as any);
  const [editTodo, setEditTodo] = useState({});
  const [deleteTodo, setDeleteTodo] = useState({
    id: "",
    name: "",
    description: "",
    isComplete: false,
  } as Todo);
  const [displayConfirmationModal, setdisplayConfirmationModal] = useState(
    false
  );

  useEffect(() => {
    getTodos();
    console.log(todos);
  }, []);

  const getTodos = () => {
    http.get(`${URL}/items`).then((newTodos: any[]) => setTodos([...newTodos]));
  };

  const handleOnDeleteClick = (todo: Todo) => {
    setdisplayConfirmationModal(true);
    setDeleteTodo(todo);
    console.log("table delete clicked", displayConfirmationModal);
  };

  const handleOnConfirmDeleteClick = () => {
    http.del(`${URL}/items/${deleteTodo.id}`).then((res) => {
      setTodos((prevTodos: Todo[]) =>
        prevTodos.filter((t: Todo) => t.id !== deleteTodo.id)
      );
      setDeleteTodo({
        id: "",
        name: "",
        description: "",
        isComplete: false,
      });
      setdisplayConfirmationModal(false);
    });
  };

  const handleOnEditClick = (todo: Todo) => {};

  /**
   * Handle Sign In Submit
   * @param enteredEmail
   * @param enteredPassword
   */
  const handleTodoFormSubmit = (
    enteredName: string,
    enteredDescription: string,
    enteredIsComplete: boolean
  ) => {
    http
      .post(`${URL}/items`, {
        name: enteredName,
        description: enteredDescription,
        enteredIsComplete,
      })
      .then((todo) => {
        setTodos((ts: any[]) => [...ts, todo]);
      });
  };

  return (
    <div>
      <br />
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <br />
      <TodoTable
        onEdit={handleOnEditClick}
        onDelete={handleOnDeleteClick}
        todos={todos}
      />
      <ConfirmationModal
        onDeleteClick={handleOnConfirmDeleteClick}
        show={displayConfirmationModal}
        onHide={() => setdisplayConfirmationModal(false)}
        title={`${deleteTodo.name}`}
        message={`Are you sure you want to delete ${deleteTodo.name}`}
      />
    </div>
  );
}
