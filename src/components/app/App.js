import "./App.modules.css";

import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// import Home from "../home/Home";
import Zero from "../art/Zero";
import ZeroAudio from "../art/ZeroAudio";
// import Artboard from "../artboard/Artboard";
import Navbar from "../navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Route path="/" component={Artboard} /> */}
        <Route path="/" component={Navbar} />
        <Switch>
          <Route exact path="/" component={Zero} />
          {/* <Route path="/art/zero" component={Zero} /> */}
          <Route path="/mikedrop" component={ZeroAudio} />
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
