import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import AuthContainer from "./containers/Auth/AuthContainer";
import PopUpsContainer from "./containers/PopUps/PopUpsContainer";

export default (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/auth" component={AuthContainer} exact />
        <Route path="/popups" component={PopUpsContainer} exact />
      </Switch>
    </BrowserRouter>
  );
};
