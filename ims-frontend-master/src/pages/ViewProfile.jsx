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
          }).catch((error)=>{
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
      <ToastContainer/>
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
      className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${"assets/images/registrationImage.jpeg"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <ToastContainer />
      <h3 className="titlePage">Your Profile</h3>

      <div className="BasicInfo">
        <h4>Your Info</h4>
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
              {localStorage.getItem("role")}
              <Form.Control
                type="text"
                value={localStorage.getItem("role")}
                disabled
              />
            </Form.Group>
          </Row>
        </Form>
      </div>

      <div className="AddInfo">
        <div className="Contact">
          <h4>Contact</h4>
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

        {/* <div className="Address">
                    <h4>Address</h4>
                    <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={employee.address} onChange={handleChange} />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control value={city} onChange={handleChangeCity} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formState">
                            <Form.Label>State</Form.Label>
                            <Form.Control value={state} onChange={handleChangeState} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control value={zip} onChange={handleChangeZip} />
                        </Form.Group>
                    </Row>
                </div> */}
      </div>

      <Button
        className="submitButton"
        variant="primary"
        type="submit"
        onClick={updateProfile}
      >
        Edit Profile
      </Button>
      <Button variant="danger" onClick={() => setModalShow(true)}>
        Change Password
      </Button>

      <ChangePassword
        employee={employee} //to send new data with updated password
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default ViewProfile;
