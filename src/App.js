import React, { useEffect } from "react";
import "./App.css";
import Header from './Header.js';
import Home from './Home.js';
import Checkout from './Checkout';
import { BrowserRouter as Router, Switch, Rooter, Route } from "react-router-dom";
import Login from './Login';
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import SignUp from './SignUp';

function App() {
   const [{}, dispatch] = useStateValue();
   
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
    if (authUser){
      dispatch({
        type:'SET_USER',
        user: authUser 
      })  
    } else {
     dispatch({
       type: "SET_USER",
       user: null
     });
    }
  })
  }, [])

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

          <Route path="/checkout">
            <Header />
            <Checkout />
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
