import "./App.modules.css";

import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../home/Home";
import Zero from "../art/Zero";
import ZeroAudio from "../art/ZeroAudio";
import Artboard from "../artboard/Artboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/art/zero" component={Zero} />
          <Route path="/art/mikedrop" component={ZeroAudio} />
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
