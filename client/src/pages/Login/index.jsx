import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

import "./styles.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  // useEffect(() => {
  //   if (localStorage.getItem("accessToken")) {
  //     setAuthState(true);
  //   }
  // }, []);

  let navigate = useNavigate();
  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };
  return (
    <div className="signUpPage">
      <div className="form">
        <input
          type="text"
          id="inputCreatePost"
          placeholder="type your username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          id="inputCreatePost"
          placeholder="type your password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={login} className="button">
          sing in
        </button>
      </div>
    </div>
  );
}

export default Login;
