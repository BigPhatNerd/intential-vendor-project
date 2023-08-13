import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Admin from "../pages/Admin";
import Alert from "../Alert";
import ResetPassword from "../pages/auth/ResetPassword";
import ResetPasswordInitiate from "../pages/auth/ResetPasswordInitiate";

const Routes = () => {
  return (
    <>
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route
          exact
          path="/reset-password-initiate"
          component={ResetPasswordInitiate}
        />
      </Switch>
    </>
  );
};

export default Routes;
