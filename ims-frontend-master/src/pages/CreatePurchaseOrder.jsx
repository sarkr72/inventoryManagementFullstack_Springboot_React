import React from "react";
import {
  productsListByCompany,
} from "../services/ProductService.js";
import { useState, useEffect } from "react";
import {
  createPurchaseOrder,
  updatePurchaseOrder,
} from "../services/PurchaseOrderService.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { listSuppliersById } from "../services/CompanyService.js";
import { createGraph, listGraphsByCompany, updateGraph } from "../services/GraphService.js";

const CreatePurchaseOrder = (props) => {
  const [errors, setErrors] = useState({
    po: "",
    supplier: "",
    productNames: "",
    date: "",
  });
  const [readyToSend, setReadyToSend] = useState(false);
  const [productError, setProductError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [graph, setGraph] = useState(null);
  const [data, setData] = useState({
    id: 0,
    date: "",
    totalAmount: 0,
    po: "",
    productNames: [],
    employee: "",
    supplier: "",
    company: "",
    quantity: 0,
  });
  const [savedProducts, setSavedProducts] = useState([
    {
      name: "",
      restockLevel: 0,
      category: "",
      unitPrice: 0,
    },
  ]);
  const [products, setProducts] = useState([]);

  const handleProductChange = (index, field, value) => {
    if (field === "productObject" && value !== "") {
      const p = JSON.parse(value);

      const productExists = Object.values(products).some(
        (product) => product?.name === p?.name
      );
      if (!productExists) {
        setSelectedProduct(value);
        setProducts((prevData) => [
          ...prevData,
          {
            name: p?.name,
            restockLevel: p?.restockLevel,
            category: p?.category,
            company: { id: p?.company?.id },
            unitPrice: 0,
            quantity: 0,
            totalPrice: parseFloat((0).toFixed(2)),
          },
        ]);
      } else {
      }
    } else if (field != "productObject") {
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = {
          ...updatedProducts[index],
          [field]:
            field === "unitPrice" || field === "quantity"
              ? parseFloat(value)
              : value,
          totalPrice:
            field === "unitPrice" || field === "quantity"
              ? parseFloat(
                  (
                    updatedProducts[index].unitPrice *
                    updatedProducts[index].quantity
                  ).toFixed(2)
                )
              : updatedProducts[index].totalPrice,
        };

        if(updatedProducts[index].unitPrice && updatedProducts[index].quantity){
          updatedProducts[index] = {
            ...updatedProducts[index],
            totalPrice: parseFloat(
                    (
                      updatedProducts[index].unitPrice *
                      updatedProducts[index].quantity
                    ).toFixed(2)
                  )
          };
        }
        if (isNaN(updatedProducts[index].totalPrice)) {
          updatedProducts[index] = {
            ...updatedProducts[index],
            totalPrice: 0,
          };
        }
        return updatedProducts;
      });
    }
  };

  useEffect(() => {
    if (readyToSend) {
      sendDataToBackend(data);
      setReadyToSend(false);
    }
  }, [data, readyToSend]);

  const isDataValid = (data) => {
    return Object.values(data).every(
      (value) => value !== null && value !== undefined && value !== ""
    );
  };

  const handlePurchase = async (e) => {
    e.preventDefault();

    if(products?.length < 1){
      toast.error("Item missing!");
    }else{
      try {
        setData((prev) => ({
          ...prev,
          company: localStorage.getItem('companyName')
        }));
        const updatedProductNames = [];
        let totalQuantity = data?.quantity || 0;
        let totalAmount = data?.totalAmount || 0;
  
        products?.forEach((p) => {
          updatedProductNames.push(`${p?.name}:${p?.unitPrice}:${p?.quantity}:${p?.totalPrice}`);
          totalQuantity += p?.quantity;
          totalAmount += p?.totalPrice;
        });
        const employee = JSON.parse(localStorage.getItem("user"));
        const name = employee?.data?.firstName + " " + employee?.data?.lastName;
        setData((prev) => ({
          ...prev,
          productNames: [...prev?.productNames, ...updatedProductNames],
          quantity: totalQuantity,
          totalAmount: totalAmount,
          company: localStorage.getItem("companyName"),
          employee: name
        }));
        setIsSubmitting(true);
      } catch (error) {
        console.log(error)
      }
    }

  };

  useEffect(() => {
    if (isSubmitting) {
      if (!isDataValid(data)) {
        toast.error("Please enter all information!");
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
        if(!props?.updateOrder){
          createPurchaseOrder(data) 
          .then((response) => {
            const graph = {date : data?.date, price: data?.totalAmount, quantity: data?.quantity, company: localStorage.getItem("companyName"), po: data?.po, pl: ''};
            createGraph(graph).then((response)=>{
              console.log('graph updated');
            })
            setProducts([]);
            setSelectedProduct('');
            toast.success("Purchase order is added successfully!")
            setData({
              date: "",
              totalAmount: 0,
              po: "",
              productNames: [],
              employee: "",
              supplier: "",
              company: "",
              quantity: 0
            })
            props.onHide();
            props.getorders();
            
          })
          .catch((error) => {
            if (error.response.status === 404) {
              toast.error("Purchase order already exists!");
            } else {
              toast.error("Something went wrong");
            }
          });
        }else if(props?.updateOrder){
          setProducts([]);
          console.log("data: ", data)
          updatePurchaseOrder(data?.id, data)
          .then((response) => {
            console.log("check", response.data)
            const graph2 = {id: graph?.id, date : data?.date, price: data?.totalAmount, quantity: data?.quantity, company: localStorage.getItem("companyName"), po: data?.po, pl: ''};
            updateGraph(graph?.id, graph2).then((response)=>{
              console.log('graph updated');
            })
            setSelectedProduct('');
            toast.success("Purchase order is added successfully!")
            setData({
              date: "",
              totalAmount: 0,
              po: "",
              productNames: [],
              employee: "",
              supplier: "",
              company: "",
              quantity: 0
            })
            props.onHide();
            props.getorders();
            // window.location.reload();
          })
          .catch((error) => {
            if (error.response.status === 404) {
              toast.error("Purchase order already exists!");
            } else {
              toast.error("Something went wrong");
            }
          });
        }
      }
    }
    console.log("2: ", data);
  }, [data, isSubmitting]);

  const handleChange = (e) => {
    console.log(e.target.value)
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (props?.updateOrder) {
      const order = props.updateOrder; 
      const names = order.productNames; 
      setProducts([]);
      names.map(product => {
       const p = product?.split(":");
       const productExists = products.some(product => product.name === p[0]);
      if (!productExists) {
        setData((prev)=> ({
          ...prev,
          po: order?.po,
          date: order?.date,
          id: order?.id,
          supplier: order?.supplier
        }))
        setProducts(prevData => [
          ...prevData,
          {
            name: p[0],
            unitPrice: parseFloat(p[1]), 
            quantity: parseInt(p[2]),
            totalPrice: parseFloat(p[3])
          }
        ]);
      }
      });
      listGraphsByCompany(localStorage.getItem("companyName")).then((response)=>{
        const data = response?.data;
        const getGraph = data?.find(graph => graph?.po === order?.po);
        setGraph(getGraph);
      }) 
    } 
  }, [props?.updateOrder, props]);


  useEffect(() => {
    productsListByCompany(localStorage.getItem("companyId"))
      .then((response) => {
        setSavedProducts(response.data);
      })
      .catch((err) => {});
      
  }, []);

  useEffect(() => {
    if (!data?.supplier ) {
      listSuppliersById(localStorage.getItem("companyId"))
        .then((response) => {
          setSuppliers(response.data);
          const supplier = response?.data[0]?.name;
          if (supplier) {
            setData((prevData) => ({
              ...prevData,
              supplier: supplier,
            }));
          }
        })
        .catch((err) => "");
    }
  }, [data]);

  const handleCartDelete = (name) => {
    const newProducts = products.filter((product) => product?.name !== name);
    setProducts(newProducts);
    setSelectedProduct("");
  };

  useEffect(() => {
    console.log("here", products);
  }, [products]);

  return (
    <>
      <ToastContainer />

      <Modal {...props} size="lg">
        <button
          type="submit"
          className="btn btn-primany"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <>
              Submitting...
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </>
          )}
        </button>
        <Form id="createPO" onSubmit={handlePurchase}>
          <Modal.Header closeButton>
            <Modal.Title>
              {!props?.updateOrder
                ? "Create Purchase Order"
                : "Update Purchase Order"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>PO:</Form.Label>
              <Form.Control
                type="text"
                name="po"
                value={data?.po}
                onChange={handleChange}
                placeholder="Enter PO name"
                disabled={props?.updateOrder}
              />
              {errors.po && <div style={{ color: "red" }}> {errors.po}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Supplier:</Form.Label>
              <select
                onChange={handleChange}
                name="supplier"
                className="form-select"
              >
                {/* <option>Choose a supplier</option> */}
                {suppliers.map((supplier, index) => (
                  <option key={index} name="supplier" value={supplier?.name}>
                    {supplier?.name}
                  </option>
                ))}
              </select>
              {errors.supplier && (
                <div style={{ color: "red" }}> {errors?.supplier}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={data?.date}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            {errors.date && <div style={{ color: "red" }}> {errors.date}</div>}
            <Form.Group>
              <div className="d-flex flex-row mt-2">
                <div className="p-2">
                  <Form.Label>Add Product: </Form.Label>
                </div>
                <div className="p-2">
                  <select
                    value={selectedProduct}
                    onChange={(e) =>
                      handleProductChange("", "productObject", e.target.value)
                    }
                    onClick={(e) => {
                      if (products.length === 0) {
                        handleProductChange(
                          "",
                          "productObject",
                          e.target.value
                        );
                      }
                    }}
                    className="form-select"
                  >
                    <option value="">choose a product</option>
                    {savedProducts.map((product, index) => (
                      <option
                        key={index}
                        name="productObject"
                        value={JSON.stringify(product)}
                      >
                        {product?.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div className="p-2">
                  <Button variant="secondary" onClick={handleAddProduct}>
                    Add{" "}
                  </Button>
                </div> */}
              </div>
              {productError && (
                <div style={{ color: "red" }}>Must choose a valid product</div>
              )}
            </Form.Group>

            <table
              className="table table-hover table-bordered table-striped table-dark"
              style={{ maxWidth: "170vh" }}
              id="productTable"
            >
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((p, index) => (
                  <>
                    {p !== null && (
                      <>
                        <tr key={index}>
                          <td>{p?.name}</td>
                          <td style={{ width: "100px" }}>
                            <input
                              className="rounded-1"
                              style={{ width: "75px" }}
                              type="number"
                              min="0"
                              max={Number.MAX_VALUE}
                              step="0.01"
                              name="unitPrice"
                              value={p?.unitPrice}
                              onChange={(e) =>
                                handleProductChange(
                                  index,
                                  "unitPrice",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td
                            style={{ height: "20px", maxWidth: "100px" }}
                            className=""
                          >
                            <input
                              type="number"
                              min="0"
                              max={Number.MAX_VALUE}
                              className="form-control"
                              style={{ height: 30 }}
                              id="qty"
                              name="quantity"
                              value={p?.quantity}
                              onChange={(e) =>
                                handleProductChange(
                                  index,
                                  "quantity",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>${p?.totalPrice.toFixed(2)}</td>
                          <td>
                            {" "}
                            <button
                              type="button"
                              className="btn btn-danger"
                              style={{ marginLeft: "15px" }}
                              onClick={() => handleCartDelete(p?.name)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>{" "}
                      </>
                    )}
                  </>
                ))}
              </tbody>
            </table>
            {errors.productNames && (
              <div style={{ color: "red" }}> {errors.productNames}</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=> { setProducts([]), setData([]), props.onHide();}}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Purchase
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePurchaseOrder;
