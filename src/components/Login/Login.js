import React, { useState } from "react";

import { useContext } from "react";
import { userContext } from "../../App";
import "./Login.css";
import { useHistory, useLocation } from "react-router";
import {
  initializeLoginFramework,
  handleGoogleSignIn,
  handleSignOut,
  handleFbSignIn,
  createUserWithEmailANdPassword,
  signWithEmailAndPassword,
} from "./LoginManager";

function Login() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const [newUser, setNewUser] = useState(false);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  initializeLoginFramework();

  const handleResponse = (res,riderect) => {
    setUser(res);
    setLoggedInUser(res);
    if(riderect){
        history.replace(from);
    }
  }

  const googleSIgnIn = () => {
    handleGoogleSignIn().then((res) => {
     handleResponse(res,true)
    });
  };
  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
        handleResponse(res,false)
    });
  };
  const signOut = () => {
    handleSignOut().then((res) => {
        handleResponse(res,false)
    });
  };
  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === "name") {
      isFieldValid = event.target.value;
    }
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = passwordHasNumber && isPasswordValid;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailANdPassword(user.name, user.email, user.password).then(
        (res) => {
            handleResponse(res,false)
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res,true)
      });
    }
    e.preventDefault();
  };

  return (
    <div className="login">
      {user.isSignedIn ? (
        <button onClick={signOut}>Sing Out</button>
      ) : (
        <div>
          <button onClick={googleSIgnIn}>sign in with Google</button>
          <button onClick={fbSignIn}>sign in using facebook</button>
        </div>
      )}

      {user.isSignedIn && (
        <div>
          <p> welcome, {user.name}</p>
          <p>Your email:{user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h1>Our own authentication</h1>
      <input
        type="checkbox"
        name="newUser"
        onChange={() => setNewUser(!newUser)}
      />
      <label htmlFor="newUser">New user Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            onBlur={handleBlur}
            name="name"
            placeholder="name"
          />
        )}
        <br />
        <input
          type="text"
          onBlur={handleBlur}
          name="email"
          placeholder="email address"
          required
        />
        <br />
        <input
          type="password"
          onBlur={handleBlur}
          name="password"
          id=""
          placeholder="password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "sign up" : "sign in"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          user {newUser ? "created" : "logged in"} successfully
        </p>
      )}
    </div>
  );
}

export default Login;
