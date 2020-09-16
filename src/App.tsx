import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { http } from "./helpers/http";
import { PrivateRoute } from "./components/PrivateRoute";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Console } from "console";
const URL = "https://cosmosauthmicroservice.azurewebsites.net/api/auth"; //"http://localhost:5000/api/auth/sign-in";

function App() {
  const [tokenIsSet, setToken] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      setToken(true);
      history.push("/");
    }
    console.log("I RUN", tokenIsSet);
  });

  /**
   * Handle Sign In Submit
   * @param enteredEmail
   * @param enteredPassword
   */
  const handleSignInSubmit = (
    enteredEmail: string,
    enteredPassword: string
  ) => {
    http
      .post(`${URL}/sign-in`, {
        Email: enteredEmail,
        Password: enteredPassword,
      })
      .then((token) => {
        console.log("sign in");
        window.localStorage.setItem("accessToken", token);
        setToken(true);
      });
  };

  /**
   * Handle Sign Up Submit
   * @param enteredEmail
   * @param enteredPassword
   */
  const handleSignUpSubmit = (
    enteredEmail: string,
    enteredPassword: string
  ) => {
    http
      .post(`${URL}/sign-up`, {
        Email: enteredEmail,
        Password: enteredPassword,
      })
      .then((token) => {
        window.localStorage.setItem("accessToken", token);
        setToken(true);
      });
  };

  return (
    <div className="app-container">
      <Switch>
        <PrivateRoute authenticated={tokenIsSet} path="/" exact>
          <Home />
        </PrivateRoute>
        <Route path="/sign-in">
          <SignIn onSubmit={handleSignInSubmit} exact></SignIn>
        </Route>
        <Route path="/sign-up">
          <SignUp onSubmit={handleSignUpSubmit} exact></SignUp>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
