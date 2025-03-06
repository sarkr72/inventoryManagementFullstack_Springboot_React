import React from "react";
import { useState, useEffect } from "react";
import CreatePurchaseOrder from "./CreatePurchaseOrder";
import ViewPurchaseOrder from "./ViewPurchaseOrder";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  purchaseOrderList,
  deletePurchaseOrder,
} from "../services/PurchaseOrderService";


const PurchaseOrderList = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const role = sessionStorage.getItem("role");
  const [searchTerm, setSearchTerm] = useState("");

  const [viewModalData, setViewModalData] = useState({
    po: "",
    date: "",
    employee: "",
    supplier: "",
    productNames: [""],
  });

  const [updateData, setUpdateData] = useState(null);

  const [orders, setOrders] = useState([
    {
      date: "",
      quantity: 0,
      totalAmount: 0,
      unitPrice: 0,
      po: "",
      productNames: [""],
      employee: "",
      supplier: "",
      company: "",
    },
  ]);


  useEffect(() => {
    getOrders();
  }, []);

  const handleDelete = (id) => {
    deletePurchaseOrder(id)
      .then((response) => {
        console.log(response);
        getOrders();
      })
      .catch((error) => console.log(error));
  };

  const getOrders = () => {
    purchaseOrderList()
      .then((response) => setOrders(response.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredPurchaseOrders = orders.filter((purchaseOrder) =>
    `${purchaseOrder.po} ${purchaseOrder.employee}`.toLowerCase().includes(searchTerm.toLowerCase())
 
  );

  return (
    <div style={{ marginTop: "20px", marginRight: "30px", marginLeft: "30px", minHeight: "85vh" }}>
      
      <Row>
        <h2 className="offset-1" as={Col} style={{ marginBottom: 50 }}>Purchase Orders</h2>
        <div as={Col} className="container d-flex mb-5" style={{ maxWidth: '600px' }}>
          <input onChange={(e) => setSearchTerm(e.target.value)} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          <button type="button" className="btn btn-primary" data-mdb-ripple-init >search</button>
        </div>
      </Row>
      <div className="m-5">
        <table
          className="table table-hover table-bordered table-striped table-dark"
          style={{ maxWidth: "100%" }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">PO</th>
              <th scope="col">Date</th>
              <th scope="col">Order created by</th>
              <th scope="col">Supplier</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchaseOrders?.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.po}</td>
                <td>{order.date}</td>
                <td>{order.employee}</td>
                <td>{order.supplier}</td>

                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setOpenViewModal(true);
                      setViewModalData(order);
                    }}
                    style={{ marginLeft: "15px" }}
                  >
                    View
                  </Button>
                  {role === 'ROLE_MANAGER' && (
                    <> <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => { setOpenUpdateModal(true); setUpdateData(order); }}
                      style={{ marginLeft: "15px" }}
                    >
                      Update
                    </button>

                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{ marginLeft: "15px" }}
                        onClick={() => handleDelete(order.id)}
                      >
                        Delete
                      </button>

                    </>)}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {role === 'ROLE_MANAGER' && (
          <>
            <div style={{ float: "right" }}>
              {" "}
              <button
                className="btn btn-dark"
                onClick={() => setOpenCreateModal(true)}
              >
                Create purchase order
              </button>
              <CreatePurchaseOrder
                show={openCreateModal}
                onHide={() => setOpenCreateModal(false)}
                getorders={() => getOrders()}
              />
            </div>
          </>)}

      </div>



      <CreatePurchaseOrder
        show={openUpdateModal}
        onHide={() => setOpenUpdateModal(false)}
        updateOrder={updateData}
        getorders={() => getOrders()}
      />
      <ViewPurchaseOrder
        show={openViewModal}
        onHide={() => setOpenViewModal(false)}
        order={viewModalData}
      />
    </div>
  );
};

export default PurchaseOrderList;
