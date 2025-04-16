import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSupplier, listSupplier } from "../services/SupplierService";
import { listSuppliersById } from "../services/CompanyService";
import { ToastContainer, toast } from "react-toastify";
import '../css/plpage.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ManageSuppliers = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = () => {
    listSuppliersById(localStorage.getItem("companyId")).then((response) => {
      setSuppliers(response?.data);
    });
  };

  const addSupplier = () => {
    navigate("/addSupplier");
  };

  const handleUpdate = (updateSupplier) => {
    navigate(
      `/updateSupplier/${encodeURIComponent(JSON.stringify(updateSupplier))}`
    );
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    `${supplier.name}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteSupplier(item?.id).then((response) => {
        getSuppliers();
        toast.success("Supplier deleted successfully!");
      });
    }
  };

  return (
    <div className="container"  style={{minHeight: "85vh"}}>
      <h2 className="container">Supplier Lists</h2>
      <ToastContainer />

      <Row>
        <div as={Col} className="container d-flex mb-5" style={{ maxWidth: '600px' }}>
          <input onChange={(e) => setSearchTerm(e.target.value)} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          <button type="button" className="btn btn-primary" data-mdb-ripple-init >search</button>
        </div>
      </Row>
      <div className="container mt-5">
        <table className="table table-hover table-bordered table-collapse">
          <thead>
            <tr key={"header"}>
              <th>#</th>
              <th>Supplier Name</th>
              <th>Supplier Address</th>
              <th>Contact</th>
              {role === 'ROLE_MANAGER' && (
                <> <th>Actions</th></>)}

            </tr>
          </thead>
          <tbody>
            {filteredSuppliers?.map((item) => (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{item?.name}</td>
                <td>{item?.address}</td>
                <td>{item?.contact}</td>
                {role === 'ROLE_MANAGER' && (
                  <>
                    <td className="d-flex flex-row">
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => handleUpdate(item)}
                        className="btn hover-over shadow bg-primary border-0 text-white "
                      >
                        Edit
                      </button>
                      <button
                        style={{ marginLeft: "10px" }}
                        className="btn bg-danger hover-over shadow border-0 text-white"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}

              </tr>
            ))}
          </tbody>
        </table>
        {role === 'ROLE_MANAGER' && (
          <>
            <div style={{ float: "right" }}>
              {" "}
              <button
                className="bg-secondary text-white mt-3"
                onClick={addSupplier}
              >
                Add supplier
              </button>
            </div>
          </>)}

      </div>
    </div>
  );
};

export default ManageSuppliers;
