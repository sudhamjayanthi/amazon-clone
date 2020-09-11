import React from "react";
import "./App.css";
import Header from './Header.js';
import Home from './Home.js';
import Checkout from './Checkout';
import { BrowserRouter as Router, Switch, Rooter, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          
          <Route path="/checkout">
            <Checkout />
          </Route>

          <Route path="/">
            <Home />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
