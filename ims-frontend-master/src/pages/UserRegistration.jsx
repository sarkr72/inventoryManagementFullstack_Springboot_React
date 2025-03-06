import React, { useState, useEffect } from "react";
import { isUserLoggedIn, registerAPICall } from "../services/AuthService";
import { listCompanies } from "../services/CompanyService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const UserRegistration = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: (isUserLoggedIn && (sessionStorage.getItem("role") === "ROLE_ADMIN" ? "ROLE_MANAGER" : sessionStorage.getItem("role") === "ROLE_MANAGER" ? "ROLE_EMPLOYEE" : "")),
    company: { id: (isUserLoggedIn && sessionStorage.getItem("role") === "ROLE_ADMIN" ? "" : parseInt(localStorage.getItem("companyId"))) }
  });
  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    try {
      const response = await listCompanies();
      setCompanies(response?.data);
    } catch (error) {
      toast.error("Failed to load companies.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!error) {
      try {
        console.log(data);
        await registerAPICall(data);
        navigate("/admin/manageAccounts");
      } catch (error) {
        toast.error(error.response.data);
        alert(error.response.data)
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
      setError(value !== data.password ? "Passwords do not match!" : "");
    } else if (name === "company") {
      setData((prevData) => ({
        ...prevData,
        [name]: { id: parseInt(value) },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div style={{ margin: 0, backgroundImage: "url(/assets/images/registrationImage.jpeg)", backgroundSize: 'cover', minHeight: '85vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
      <div style={{ minHeight: "80vh", position: 'relative', zIndex: 1 }} className="container mt-md-20 d-flex flex-column justify-content-center align-items-center">

        <div className="row border rounded-3 h-auto p-3 bg-white shadow">
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <h3 className="text-dark" style={{ marginBottom: 50 }}>User  Registration</h3>
          </div>
          <div className="col-md-4 rounded-4 col-lg-3 m-md-auto m-sm-auto text-center">
            <img src="/assets/images/logo2.png" alt='' style={{ width: '120px', height: '125px' }} />
            <h5>Inventory Management System</h5>
            <p style={{ marginTop: '-10px' }}>Register a new user!</p>
          </div>
          <div className="col-md-6 col-lg-5">
            <form onSubmit={handleSubmit} className="input-group">
              {sessionStorage.getItem("role") === "ROLE_ADMIN" && (
                <div className="input-group mb-3">
                  <select style={{ height: "35px ", width: "100%" }} onChange={handleChange} name="company" required>
                    <option value="">Select Company</option>
                    {companies?.map((item) => (
                      item?.name !== localStorage.getItem("companyName") && (
                        <option key={item?.id} value={item?.id}>
                          {item?.name}
                        </option>
                      )
                    ))}
                  </select>
                </div>
              )}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={data.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={data.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && confirmPassword && (
                <div>
                  <label className='mt-1 rounded-1 p-1 fw-bold text-danger bg-white'>{error}</label>
                </div>
              )}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={data.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group d-flex flex-column align-items-center">
                <button type="submit" className="btn btn-primary w-100 mb-2">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegistration;