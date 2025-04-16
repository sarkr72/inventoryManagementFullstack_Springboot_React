import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getEmployee,
  listEmployees,
} from "../services/EmployeeService";
import {
  loginAPICall,
  saveLoggedInUser,
  setTokens
} from "../services/AuthService";
import { AppContext } from "../components/AppProvider";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const token = "Basic " + window.btoa(email + ":" + password);

       const response = await loginAPICall(email, password);

       if (response.accessToken && response.refreshToken) {
        setTokens(response.accessToken, response.refreshToken);
        saveLoggedInUser(email, response.role);
        signIn(true);

        const employeeResponse = await getEmployee(email);
        const data = employeeResponse.data;
        if (data) {
          // console.log("data", data);
          localStorage.setItem("user", JSON.stringify({ data }));
          localStorage.setItem("companyName", data.company.name);
          localStorage.setItem("companyId", data.companyId);
          localStorage.setItem("company", JSON.stringify(data.company));

          navigate("/homepage");
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Invalid email or password. Please try again.");
        } else if (error.response.status === 403) {
          toast.error("Access denied. You do not have permission to log in.");
        } else {
          toast.error(error.response.data || "An error occurred during login.");
        }
      } else {
        console.error(error);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  return (
    <div
      style={{
        backgroundImage: `url("/assets/images/inventory-management.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{ minHeight: "90vh" }}
        className="container mb-0 mt-md-20 d-flex flex-column justify-content-center align-items-center"
      >
        <ToastContainer />
        <div
          style={{ width: "600px" }}
          className="row border rounded-3 h-auto p-3 bg-white shadow"
        >
          <h3 className="card-title text-center mb-4">Log In</h3>
          <div className="col-md-4 col-lg-3 p-0 rounded-4 text-center m-auto">
            <div className="mb-3">
              <img
                src="/assets/images/logo2.png"
                alt="Logo"
                style={{ width: "120px", height: "125px" }}
              />
            </div>
            <h5>Inventory Management System</h5>
            <p style={{ marginTop: "-10px" }}>Please sign in to get started.</p>
          </div>

          <div className="col-md-6 col-lg-5">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <label>Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  required
                />
                <label>Password</label>
              </div>

              <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                    />
                    <label className="form-check-label"> Remember me </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                style={{ width: "100%" }}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
