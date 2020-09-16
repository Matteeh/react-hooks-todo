import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

export function ProtectedRoutes(props: any) {
  const { children, authenticated, ...rest } = props;
  console.log(authenticated, "authenticated");
  return authenticated ? (
    children
  ) : (
    <Redirect
      to={{
        pathname: "/sign-in",
        state: { from: location },
      }}
    />
  );
}
