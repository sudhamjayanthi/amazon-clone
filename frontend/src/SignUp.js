import React, { useState } from "react";
import "./SignUp.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const updateName = () => {
    auth.currentUser
      .updateProfile({
        displayName: name,
      })
  };
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          updateName();
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="signUp">
      <Link to="/">
        <img
          alt="amazon-logo"
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-up</h1>

        <form>
          <h5>Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={register}
            className="login__signInButton "
          >
            Sign up
          </button>
        </form>

        <p>
          By signing-in you need not agree to the <strong>Amazon Clone</strong> Conditions of Use & Sale. You don't need to see our Privacy Notice, our Cookies
          Notice and our Interest-Based Ads Notice as well, your computer is hacked already anyways lmao. <br />
          <br />
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
