import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Posts } from "./Posts";
import { PageFreelance } from "./PageFreelance";
import "./App.css";

export const App = () => {
  return (
    <Router>
      <div>
        <header style={{ padding: "0 40px", display: "flex", alignItems: "center" }}>
          <img
            style={{ height: "100px" }}
            src="https://www.cluster-freelance.io/src/images/dist/logo-main.png"
            alt="logo"
          />
          <Button variant="contained" color="primary" component={NavLink} to="/" style={{ margin: "20px" }}>
            Frelances
          </Button>
          <Button variant="contained" color="secondary" component={NavLink} to="/posts">
            Posts
          </Button>
        </header>
        {/* <div id="auth-container" /> */}
        <main className="App-header">
          <Switch>
            <Route exact path="/" component={PageFreelance} />
            <Route exact path="/posts" component={Posts} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};
