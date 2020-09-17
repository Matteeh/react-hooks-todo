import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { http } from "./helpers/http";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Navigation from "./components/Navigation";
const URL = "https://cosmosauthmicroservice.azurewebsites.net/api/auth"; //"http://localhost:5000/api/auth/sign-in";

function App() {
  const [tokenIsSet, setToken] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      const token = window.localStorage.getItem("accessToken") || "";
      const decoded: any = jwt_decode(token);
      setLocalStorageItems(decoded.sub, decoded.Email);
      setToken(true);
      history.push("/");
    }
  });

  /**
   * Set userId and email in localstorage
   * @param userId
   * @param email
   */
  const setLocalStorageItems = (userId: string, email: string) => {
    window.localStorage.setItem("userId", userId);
    window.localStorage.setItem("email", email);
  };

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

  const handleSignOut = () => {
    window.localStorage.clear();
    setToken(false);
  };

  return (
    <div className="app-container">
      <Switch>
        <PrivateRoute authenticated={tokenIsSet} path="/" exact>
          <Navigation onSignOut={handleSignOut} />
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
