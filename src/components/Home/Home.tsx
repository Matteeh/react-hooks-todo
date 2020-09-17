import React, { useState, useEffect } from "react";
import TodoForm from "../TodoForm";
import TodoTable from "../TodoTable";
import ConfirmationModal from "../ConfirmationModal";
import { http } from "../../helpers/http";
import { Todo } from "../../models/Todo";
import EditTodoModal from "../EditTodoModal";

const URL = "https://cosmostodosmicroservice.azurewebsites.net/api";

export function Home(props: any) {
  const [todos, setTodos] = useState([] as any);
  const [editTodo, setEditTodo] = useState({} as Todo);
  const [deleteTodo, setDeleteTodo] = useState({
    id: "",
    name: "",
    description: "",
    completed: false,
  } as Todo);
  const [displayConfirmationModal, setdisplayConfirmationModal] = useState(
    false
  );
  const [displayEditTodoModal, setDisplayEditTodoModal] = useState(false);

  useEffect(() => {
    getUserTodos();
  }, []);

  const getUserTodos = () => {
    http.get(`${URL}/items`).then((newTodos: any[]) => setTodos([...newTodos]));
  };

  const handleDeleteClick = (todo: Todo) => {
    setdisplayConfirmationModal(true);
    setDeleteTodo(todo);
    console.log("table delete clicked", displayConfirmationModal);
  };

  const handleOnConfirmDeleteClick = () => {
    http
      .del(`${URL}/items/${deleteTodo.id}`)
      .then((res) => {
        setTodos((prevTodos: Todo[]) =>
          prevTodos.filter((t: Todo) => t.id !== deleteTodo.id)
        );
        setDeleteTodo({
          id: "",
          userId: "",
          name: "",
          description: "",
          completed: false,
        });
        setdisplayConfirmationModal(false);
      })
      .catch((err) => {
        console.error(err);
        setDeleteTodo({
          id: "",
          userId: "",
          name: "",
          description: "",
          completed: false,
        });
        setdisplayConfirmationModal(false);
      });
  };

  const handleEditClick = (todo: Todo) => {
    setDisplayEditTodoModal(true);
    setEditTodo(todo);
    console.log("table edit clicked", todo);
  };

  const handleEditTodoModalSubmit = (
    enteredName: string,
    enteredDescription: string,
    enteredIsComplete: boolean
  ) => {
    console.log(enteredIsComplete, "isComplete");
    http
      .put(`${URL}/items/${editTodo.id}`, {
        id: editTodo.id,
        userId: window.localStorage.getItem("userId") || "",
        name: enteredName,
        description: enteredDescription,
        completed: enteredIsComplete,
      })
      .then((todo) => {
        setTodos([
          ...todos.filter((todo: Todo) => todo.id !== editTodo.id),
          todo,
        ]);
        setDisplayEditTodoModal(false);
        setEditTodo({} as Todo);
        console.log(todo);
      });
  };

  /**
   * Handle Todo form Submit
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
        userId: window.localStorage.getItem("userId") || "",
        name: enteredName,
        description: enteredDescription,
        completed: enteredIsComplete,
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
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        todos={todos}
      />
      <ConfirmationModal
        onDeleteClick={handleOnConfirmDeleteClick}
        show={displayConfirmationModal}
        onHide={() => setdisplayConfirmationModal(false)}
        title={`${deleteTodo.name}`}
        message={`Are you sure you want to delete ${deleteTodo.name}`}
      />
      <EditTodoModal
        show={displayEditTodoModal}
        oldTodo={editTodo}
        onHide={() => setDisplayEditTodoModal(false)}
        onSubmit={handleEditTodoModalSubmit}
      />
    </div>
  );
}
