import React, { useState, useEffect } from "react";
import TodoForm from "../TodoForm";
import TodoTable from "../TodoTable";
import { http } from "../../helpers/http";

const URL = "https://cosmostodosmicroservice.azurewebsites.net/api";

export function Home(props: any) {
  const [todos, setTodos] = useState([] as any);

  useEffect(() => {
    getTodos();
    console.log(todos);
  }, []);

  const getTodos = () => {
    http.get(`${URL}/items`).then((newTodos: any[]) => setTodos([...newTodos]));
  };

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
      <TodoTable todos={todos} />
    </div>
  );
}
