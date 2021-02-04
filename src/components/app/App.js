import "./App.modules.css";

import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Zero from "../art/Zero";
import Mikedrop from "../art/Mikedrop";
import Mikehack from "../art/Mikehack";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Navbar} />
        <Switch>
          <Route exact path="/" component={Zero} />
          <Route exact path="/mikedrop" component={Mikedrop} />
          <Route exact path="/mikehack" component={Mikehack} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
