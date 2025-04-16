import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteWarehouse, listWarehousesByCompanyId } from "../services/WarehouseService";
import { ToastContainer, toast } from "react-toastify";
import "../css/plpage.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ManageWarehouses = () => {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    getWarehouses();
  }, []);

  const getWarehouses = () => {
    listWarehousesByCompanyId(localStorage.getItem("companyId")).then(
      (response) => {
        setWarehouses(response?.data);
      }
    );
  };
  const handleClick = (warehouse) => {
    // navigate("/viewWarehouse", { state: { warehouse } });
    navigate(`/viewWarehouse/${warehouse.id}`);
  };
  const addWarehouse = () => {
    navigate("/addWarehouse");
  };

  const handleUpdate = (warehouse) => {
    navigate(
      `/updateWarehouse/${encodeURIComponent(JSON.stringify(warehouse))}`
    );
  };

  //filter warehouses by name or other criterias
  const filteredWarehouse = warehouses.filter((warehouse) =>
    `${warehouse.name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteWarehouse(id).then((response) => {
        getWarehouses();
        toast.success("Supplier deleted successfully!");
      })
    }
  };

  return (
    <div className="container" style={{ minHeight: "85vh"}}>
      <div className="m-5" style={{ maxWidth: "85%", margin: "auto" }}>
        <ToastContainer />
        <Row>
          <div as={Col} className="container d-flex mb-5" style={{ maxWidth: '600px' }}>
            <input onChange={(e) => setSearchTerm(e.target.value)} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" className="btn btn-primary" data-mdb-ripple-init >search</button>
          </div>
        </Row>
        <div style={{background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)'}} className="p-3 rounded-3 shadow-sm border">
        <h2 className="container mb-3">Warehouse Lists</h2>
        <table className="table table-hover table-bordered" style={{ border: '2px solid black', borderCollapse: 'collapse' }}> 
          <thead>
            <tr key={"header"}>
              <th>#</th>
              <th>Warehouse Name</th>
              <th>Warehouse Address</th>
              <th>Max Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWarehouse?.map((item) => (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td
                  onClick={() => handleClick(item)}
                  style={{
                    backgroundColor: "#d0f1b9",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {item?.name}
                </td>
                <td>{item?.address}</td>
                <td>{item?.maxCapacity}</td>
                <td className="d-flex flex-row">
                  <button
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#b8f48d",
                      color: "black",
                      fontWeight: 600,
                    }}
                    onClick={() => handleClick(item)}
                    className="btn border-0 hover-over shadow-sm"
                  >
                    Open
                  </button>
                  {role === "ROLE_MANAGER" && (
                    <>
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => handleUpdate(item)}
                        className="btn bg-primary hover-over shadow-sm border-0 text-white "
                      >
                        Edit
                      </button>
                      <button
                        style={{ marginLeft: "10px" }}
                        className="btn bg-danger hover-over shadow-sm border-0 text-white"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
       
        {role === "ROLE_MANAGER" && (
          <>
            <div style={{ float: "right" }}>
              {" "}
              <button
                className="bg-secondary text-white mt-3"
                onClick={addWarehouse}
              >
                Add Warehouse
              </button>
            </div></>
        )}
      </div>
      
    </div>
  );
};

export default ManageWarehouses;
