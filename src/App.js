/* eslint-disable no-debugger, no-console */
import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header.js";
import Home from "./Home.js";
import Checkout from "./Checkout";
import Payment from "./Payment";
// eslint-disable-next-line
import {
  BrowserRouter as Router,
  Switch,
  Rooter,
  Route,
} from "react-router-dom";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import SignUp from "./SignUp";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const [{}, dispatch] = useStateValue();
  const promise = loadStripe(
    "pk_test_51HRsQJD05vTlUJVlMhHMZ0rhVrik5J4d9MOM6HheU1nxpjuGQALpaw3eYoq5k5FvjYfsLQkG1CdHmzHysPtGSX5u00AT0fiWwi"
  );

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup">
            <Login />
          </Route>

          <Route path="/register">
            <SignUp />
          </Route>

          <Route path="/cart">
            <Header />
            <Checkout />
          </Route>

          <Route path="/checkout">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
