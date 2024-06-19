import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegistrationPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationPage = () => {
  const notify = () => toast.success("registration successful");
  const [registeredData, setRegisteredData] = useState({
    username: "",
    password: "",
  });
  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegisteredData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(
        "http://localhost:8000/register",
        registeredData
      );
      console.log(responce.data);
    } catch (error) {
      console.log(error);
    }
    setRegisteredData({
      username: "",
      password: "",
    });
  };
  return (
    <div className="registration-container">
      <form onSubmit={handleRegistrationSubmit} className="form-container">
        <h1 className="form-container h1">Registration From</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={registeredData.username}
          onChange={handleRegistrationChange}
          required
          className="form-group input"
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          value={registeredData.password}
          onChange={handleRegistrationChange}
          required
          className="form-group input"
        />
        <button type="submit" className="register-btn" onClick={notify}>
          register
        </button>
        <p className="already-account">
          alredy has an acoount?
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationPage;
