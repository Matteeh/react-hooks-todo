import React from "react";
import { Route, Redirect } from "react-router-dom";

export function PrivateRoute(props: any) {
  const { children, authenticated, ...rest } = props;
  console.log(authenticated, "authenticated");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
