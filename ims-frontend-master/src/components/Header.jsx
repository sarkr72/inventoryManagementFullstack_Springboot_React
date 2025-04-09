import React from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom/dist";
import { isUserLoggedIn, logout } from "../services/AuthService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the icon you want to use


const Header = () => {
  const navigate = useNavigate();
  const isAuth = isUserLoggedIn();
  // const { role } = React.useContext(AppContext);
  const role = sessionStorage.getItem("role");
  const name = JSON.parse(localStorage.getItem("user"))?.data[0]?.firstName?.toUpperCase();
  const logoUrl = JSON.parse(localStorage.getItem("company"))?.logoUrl();

  const logoutHandler = () => {
    logout();
    // navigate("/login");
  };

  return (
    <div >
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="w-100 shadow"
        style={{ marginBottom: '0' }}
      >
        <Container fluid>
          <Navbar.Brand
            onClick={() => navigate(`${isAuth ? "/homepage" : "/"}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              // src="/assets/images/logo2.png"
              src={logoUrl}
              alt="Company Logo"
              className="rounded-2"
              style={{ width: "30px", height: "30px" }}
            />{" "}
            IMS
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="ml-auto">
            <Nav className=" ml-auto" style={{ right: 5, marginLeft: 'auto', position: "relative" }} >
              {isAuth && (
                <>
                  <LinkContainer to="/homepage">
                    <Nav.Link>HOME</Nav.Link>
                  </LinkContainer>

                </>
              )}
              {!isAuth && (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i>Login
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              {isAuth && (
                <NavDropdown title={role.split("_")[1]} id="adminmenue">
                  {(role === "ROLE_ADMIN" ||
                    role === "ROLE_MANAGER") && (
                      <>
                        <LinkContainer to="/admin/registerUser">
                          <NavDropdown.Item>Register User</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/manageAccounts">
                          <NavDropdown.Item>Accounts</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}
                  {role === "ROLE_ADMIN" && (
                    <LinkContainer to="/manageCompanies">
                      <NavDropdown.Item>Companies</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  {(role === "ROLE_MANAGER" ||
                    role === "ROLE_EMPLOYEE") && (
                      <>
                        <LinkContainer to="/manageWarehouses">
                          <NavDropdown.Item>Warehouses</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to="/manageSuppliers">
                          <NavDropdown.Item>Suppliers</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to="/admin/purchaseOrder">
                          <NavDropdown.Item>Purchase Orders</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/products">
                          <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/statistics">
                          <NavDropdown.Item>Statistics</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}
                </NavDropdown>
              )}
              {isAuth && (
                <>
                  <NavDropdown title={<span> <FontAwesomeIcon icon={faUser} /> {name} </span>} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
