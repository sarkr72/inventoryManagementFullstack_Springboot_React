import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import { listEmployees } from "../services/EmployeeService";
import { updateEmployee } from "../services/EmployeeService";
import { getCompany } from "../services/CompanyService";
import { AppContext } from "../components/AppProvider";
import { deleteEmployee } from "../services/EmployeeService";


function EmployeeInfo(props) {
    const reload = () => {
        props.onHide();
        // window.location.reload();
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1>About {props.firstname}</h1>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h5>ID: {props.id}</h5>
                <h5>First Name: {props.firstname}</h5>
                <h5>Last Name: {props.lastname}</h5>
                <h5>Email Address: {props.email}</h5>
                <h5>Phone Number: {props.phone}</h5>
                <h5>Role: {props.role}</h5>
                <h5>Company: {props.company}</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" onClick={reload}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const ManageAccount = () => {
    // const { role } = React.useContext(AppContext);
    const role = sessionStorage.getItem('role');
    const [Employee, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getEmployees();
    }, [])

    const getEmployees = () => {
        if (role === 'ROLE_MANAGER') {
            getCompany(localStorage.getItem("companyId")).then((response) => {
                const allEmployees = response.data?.employees?.filter(employee => employee?.roles?.some(role => role.name === "ROLE_EMPLOYEE"))
                setEmployee(allEmployees);
                setLoading(false);
            }).catch((err) => {
                setError("Failed to fetch employee", err);
                setLoading(false);
            });
        } else if (role === "ROLE_ADMIN") {
               console.log("here2")
            listEmployees().then((response) => {
                const allEmployees = response.data?.filter(employee => employee?.roles?.some(role => role.name === "ROLE_MANAGER"))
                setEmployee(allEmployees);
                setLoading(false);
                console.log("here")
            })
        }
    }

    const revokeEmployee = (employee) => {
        if (window.confirm("Are you sure you want to revoke access for this employee")) {
            console.log(employee.id);
            deleteEmployee(employee.id).then((response) => {
                toast.success("Employee revoked");
                getEmployees();
            }).catch((err) => {
                toast.error("Failed to revoke access for employee");
            })
        }

    }

    const promoteToAdmin = (employee) => {
        //Can only update Employees
        if (employee.roles[0].name === 'ROLE_EMPLOYEE') {
            const newEmployee = {
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                password: employee.password,
                phone: employee.phone,
                roles: [
                    {
                        id: employee.roles[0].id,
                        name: 'ROLE_MANAGER'
                    }
                ],
                companyId: {
                    id: localStorage.getItem("companyId")
                }
            }
            // console.log(newEmployee)
            console.log(employee.id)
            updateEmployee(employee.id, newEmployee).then((response) => {
                toast.success("Employee promoted");
                console.log(newEmployee)
                getEmployees();
            })
        }
        else {
            toast.error("Cannot promote Managers")
        }
    }
    /**
      * Searches for specific employee
      */
    const filteredEmployees = Employee.filter((employee) =>
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const [employee2, setEmployee2] = useState(null);
    const handleClick = (employee) => {
        setEmployee2(employee);
    }
    if (loading) return <div> <h1>Loading...</h1></div>
    if (error) return <div>{error}</div>

    return (
        <div className="container" style={{ backgroundImage: `url(${"assets/images/registrationImage.jpeg"})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', minHeight: "85vh" }}>
            <ToastContainer />
            <Row className="mt-5">
                <div as={Col} className="container d-flex mb-5" style={{ maxWidth: '600px' }}>
                    <input onChange={(e) => setSearchTerm(e.target.value)} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <button type="button" className="btn btn-primary" data-mdb-ripple-init >search</button>
                </div>
            </Row>


            <div className="container rounded-3 shadow pt-0 border" style={{ background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)' }}>
                <div style={{ display: 'grid', placeItems: 'center' }}><h2 as={Col} style={{ marginBottom: 50 }}>Current {localStorage.getItem("role") === "ROLE_ADMIN" ? "Managers" : "Employees"}</h2> </div>

                <div className="d-flex flex-wrap justify-content-around mb-3">
                    {filteredEmployees?.map((employee, index) => (
                        <Card key={index} style={{ width: "15rem", height: "25rem", marginBottom: "2rem" }}>
                            <Card.Img variant="top" src="/assets/images/userIcon.jpg" />
                            <Card.Body>
                                <Card.Title>{employee.firstName} {employee.lastName}</Card.Title>
                                <Card.Text>
                                    <p>Role: {employee.roles[0].name}</p>
                                </Card.Text>
                                <DropdownButton id="dropdown-basic-button" title="Action" onClick={() => handleClick(employee)}>
                                    <Dropdown.Item onClick={() => setShowModal(true)}>View Details</Dropdown.Item>

                                    {showModal && (
                                        <>
                                            <EmployeeInfo
                                                firstname={employee2.firstName}
                                                lastname={employee2.lastName}
                                                id={employee2.id}
                                                email={employee2.email}
                                                phone={employee2.phone}
                                                role={employee2.roles[0].name}
                                                company={localStorage.getItem("companyName")}
                                                show={showModal}
                                                onHide={() => setShowModal(false)}
                                            />
                                        </>
                                    )}

                                    {localStorage.getItem("role") === "ROLE_MANAGER" &&
                                        <Dropdown.Item onClick={() => promoteToAdmin(employee)}>Promote Status</Dropdown.Item>
                                    }

                                    <Dropdown.Item onClick={() => revokeEmployee(employee)}>Revoke Access</Dropdown.Item>
                                </DropdownButton>
                            </Card.Body>
                        </Card>

                    ))}
                </div>
            </div>
        </div>
    )
};
export default ManageAccount;