import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
    const notify = () => toast.success('login success');
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault("");

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        loginData
      );
      const { success, message } = response.data;

      if (success) {
        console.log("login success");
      } else {
        console.log(message);
      }
    } catch (err) {
      console.error("Login error", err);
    }

    setLoginData({
      username: "",
      password: "",
    });
  };
  return (
    <div className="login-container">
      <form onSubmit={handleLoginSubmit} className="form-container">
        <h1 className="form-container h1">Login Page</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginData.username}
          onChange={handleLoginChange}
          required
          className="form-group input"
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          value={loginData.password}
          onChange={handleLoginChange}
          required
          className="form-group input"
        />
        <button type="submit" className="login-btn" onClick={notify}>
          Login
        </button>
        <p className="register-link">
          Not registered yet?
          <Link to="/register">register here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
