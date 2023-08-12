import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/pages/Landing";
import Routes from "./components/routing/Routes";
import RegistrationState from "./context/registration/RegistrationState";
import VendingState from "./context/vending/VendingState";

function App() {
  return (
    <VendingState>
      <RegistrationState>
        <Router>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Router>
      </RegistrationState>
    </VendingState>
  );
}

export default App;
