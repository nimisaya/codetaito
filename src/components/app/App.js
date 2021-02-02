import "./App.modules.css";

import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../home/Home";
import Mathfun from "../art/Mathfun";
import Zero from "../art/Zero";
import Artboard from "../artboard/Artboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/art/mathfun" component={Mathfun} />
          <Route path="/art/zero" component={Zero} />
          <Route exact path="/art" component={Artboard} />
        </Switch>
      </Router>
      <footer>
        <a href="https://github.com/nimisaya" target="_blank" rel="noreferrer">
          <p>&copy; Amanda Jarvinen, 2021</p>
        </a>
      </footer>
    </div>
  );
}

export default App;
