import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./ViewProfile.css";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import {
  getEmployee,
  getEmployeeByAuth,
  updateEmployee,
} from "../services/EmployeeService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ChangePassword(props) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPwrd] = useState("");

  const handleChangeNewPassword = (e) => setNewPassword(e.target.value);
  const handleChangeConfirmPassword = (e) => setConfirmPwrd(e.target.value);

  const verifyPassword = () => {
    console.log(newPassword)
    if (newPassword === confirmPassword) {
      const newEmployee = {
        id: props.employee.id,
        firstName: props.employee.firstName,
        lastName: props.employee.lastName,
        email: props.employee.email,
        password: newPassword,
        phone: props.employee.phone,
      }
      if (window.confirm("Confirm to change password")) {
        updateEmployee(props.employee.id, newEmployee).then((response) => {
          toast.success("Password successfully updated");
          window.location.reload(true);
        }).catch((error) => {
          toast.error("Failed to change password");
        }
        )
      }
    }
    else {
      toast.error("Password do not match")
    }
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ToastContainer />
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" value={newPassword} onChange={handleChangeNewPassword} placeholder="New Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" value={confirmPassword} onChange={handleChangeConfirmPassword} placeholder="Confirm Password" />
          </Form.Group>
          <Button variant="primary" onClick={verifyPassword}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}



const ViewProfile = () => {
  const profileUrl = JSON.parse(localStorage.getItem("user"))?.data?.profileUrl;
  const data = JSON.parse(localStorage.getItem("user"))?.data;
  const [employee, setEmployee] = useState({
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
  });
  const [newEmployee, setNewEmployee] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const updateProfile = () => {
    if (window.confirm("Confirm to update profile")) {
      updateEmployee(employee.id, employee).then((response) => {
        const data = response.data;
        localStorage.setItem("user", JSON.stringify({ data }));
        toast.success("Profile successfully updated");
      });
    }
  };

  const handleChange = (e) => {
    setEmployee((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div
      id="container"
      className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: `url("/assets/images/registrationImage.jpeg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "3rem",
        paddingBottom: "3rem"
      }}
    >
      <ToastContainer />
      <h3 className="titlePage text-white mb-4">Your Profile</h3>
  
      <div className="BasicInfo bg-light p-4 rounded shadow" style={{ width: "100%", maxWidth: "600px" }}>
        <div className="text-center mb-3">
          <img
            src={profileUrl || "/assets/images/default-profile.png"}
            alt="profile"
            style={{
              width: "180px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "50%",
              border: "4px solid #007bff"
            }}
          />
        </div>
        <h4 className="text-center mb-3">Your Info</h4>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={employee.firstName}
                onChange={handleChange}
              />
            </Form.Group>
  
            <Form.Group as={Col} controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={employee.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
  
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formCompany">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                value={localStorage.getItem("companyName")}
                disabled
              />
            </Form.Group>
  
            <Form.Group as={Col} controlId="formPosition">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                value={localStorage.getItem("role")}
                disabled
              />
            </Form.Group>
          </Row>
        </Form>
      </div>
  
      <div className="AddInfo bg-light p-4 rounded shadow mt-4" style={{ width: "100%", maxWidth: "600px" }}>
        <div className="Contact">
          <h4 className="text-center mb-3">Contact</h4>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
              />
            </Form.Group>
  
            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={employee.email} disabled />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              value={localStorage.getItem("role")}
              disabled
            />
          </Form.Group>
        </div>
      </div>
  
      <div className="d-flex gap-3 mt-4">
        <Button variant="primary" onClick={updateProfile}>
          Edit Profile
        </Button>
        <Button variant="danger" onClick={() => setModalShow(true)}>
          Change Password
        </Button>
      </div>
  
      <ChangePassword
        employee={employee}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
  
};

export default ViewProfile;
