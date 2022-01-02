// React Components
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//  3rd Party Modules
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { auth } from "./firebase";

// Custom Components
import Header from "./Header";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import Payment from "./Payment";
import Checkout from "./Checkout";

import { useStateValue } from "./StateProvider"; 

function App() {
  const [{}, dispatch] = useStateValue();
  const promise = loadStripe("pk_test_51HRsQJD05vTlUJVlMhHMZ0rhVrik5J4d9MOM6HheU1nxpjuGQALpaw3eYoq5k5FvjYfsLQkG1CdHmzHysPtGSX5u00AT0fiWwi");

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
