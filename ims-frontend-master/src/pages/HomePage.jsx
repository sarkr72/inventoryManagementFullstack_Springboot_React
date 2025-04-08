import React, {useState } from "react";
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import '../css/homepage.css'
import { AppContext } from '../components/AppProvider';
import { Row, Col } from 'react-bootstrap';

function NavScrollExample() {
  const navigate = useNavigate();
  // const { role } = React.useContext(AppContext);
  const role = sessionStorage.getItem("role");

  return (
    <div style={{paddingBottom: "45px", minHeight: '100vh', background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)' }}>
      <Container fluid >
      <Row className="d-flex justify-content-center">
        <Col className="bg-dark text-white rounded-4 shadow mt-2" style={{maxWidth:"30%"}}>
          <h1 className="display-4 text-center">IMS Dashboard</h1>
          <p className="lead text-center">Efficiently manage your stock and streamline your operations.</p>
        </Col>
      </Row>
    </Container>
     

      <div className="container bg-white border p-3 rounded-3 shadow pt-5 d-flex flex-wrap justify-content-around mt-5 mb-10">
        {(role === "ROLE_ADMIN" || role === "ROLE_MANAGER") && (
          <>
            <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/addUser.jpg" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold" }}>Register User</h5>
                <button onClick={() => navigate('/admin/registerUser')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}>Register User</button>
              </div>
            </div>

            <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/manageAccount.png" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold" }}>Accounts</h5>
                <button onClick={() => navigate('/admin/manageAccounts')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}>Accounts</button>
              </div>
            </div>

          </>
        )}

        {(role === "ROLE_ADMIN") && (
          <>
            <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/companies.png" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold" }}>Companies</h5>
                <button onClick={() => navigate('/manageCompanies')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}>Companies</button>
              </div>
            </div>

          </>
        )}

        {(role === "ROLE_MANAGER" || role === "ROLE_EMPLOYEE") && (
          <>

            <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/viewWarehouse.jpg" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold" }}>Warehouses</h5>
                <button onClick={() => navigate('/manageWarehouses')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}> warehouses</button>
              </div>
            </div>



            <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%",  borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/addProduct.jpg" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold" }}>Products</h5>
                <button onClick={() => navigate('/products')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}>Products</button>
              </div>
            </div>

            <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/Supplier-Photoroom.png" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold" }}>Suppliers</h5>
                <button onClick={() => navigate('/manageSuppliers')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}>suppliers</button>
              </div>
            </div>

            <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/purchaseOrder.png" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold" }}> Purchase Orders</h5>
                <button onClick={() => navigate('/admin/purchaseOrder')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}>Purchase Orders</button>
              </div>
            </div>

            <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/statistics.png" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold" }}> Statistics</h5>
                <button onClick={() => navigate('/statistics')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}>Statistics</button>
              </div>
            </div>
          </>
        )}



      </div>
    </div>

  );
}

export default NavScrollExample;