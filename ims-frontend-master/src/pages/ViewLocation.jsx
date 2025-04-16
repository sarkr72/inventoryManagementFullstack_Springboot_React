import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createProductLocation,
  deleteProductLocation,
  listProductLocationsByLocation,
  updateProductLocation,
} from "../services/ProductLocations";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { productsList, productsListByCompany } from '../services/ProductService'
import { listSuppliersById } from '../services/CompanyService';
import { purchaseOrderListByCompany } from '../services/PurchaseOrderService';
import { getLocation, updateLocation } from '../services/LocationService';
import '../css/plpage.css';
import { createGraph, listGraphsByCompany, updateGraph } from '../services/GraphService';

const ViewLocation = () => {
  const [productLocations, setProductLocations] = useState([]);
  const navigate = useNavigate();
  const locations = useLocation();
  const { locationId } = locations.state || null;
  const [editingRow, setEditingRow] = useState(null);
  const [editableData, setEditableData] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [pos, setPos] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [total, setTotal] = useState(0);
  const [location, setLocation] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [warehouse, setWarehouse] = useState("");
  const [graph, setGraph] = useState(null);

  const [data, setData] = useState({
    supplier: "",
    quantity: "",
    unitPrice: "",
    totalprice: "",
    mfgDate: "",
    expDate: "",
    location: "",
    batchNumber: "",
    po: "",
    receivedDate: "",
    product: "",
    company: "",
    id: "",
  });
  const [dataLocation, setDataLocation] = useState({
    warehouse: { id: "" },
    stock: 0,
    available: "",
    id: "",
    row: "",
    col: "",
    maxCapacity: "",
    isEmpty: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (locationId) {
        try {
          const response = await getLocation(locationId);
          const location = response.data;
          setDataLocation(location);
          getPlByLocation(
            location.row,
            location.col,
            location.warehouseName,
            localStorage.getItem("companyName")
          );
          getProducts();
          getSuppliers();
          getPos();
          setLocation(location);
          setWarehouse(location.warehouseName);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [locationId, refresh]);

  const getPlByLocation = (row, col, wh, company) => {
    listProductLocationsByLocation(row, col, wh, company).then((response) => {
      setProductLocations(response.data);
      const total = response.data.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
      const formatted = new Intl.NumberFormat().format(total);
      setTotal(formatted);
    });
  };

  const getProducts = () => {
    productsListByCompany(localStorage.getItem("companyId"))
      .then((response) => {
        setProducts(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSuppliers = () => {
    listSuppliersById(localStorage.getItem("companyId")).then((response) => {
      setSuppliers(response?.data);
    });
  };

  const getPos = () => {
    purchaseOrderListByCompany(localStorage.getItem("companyName"))
      .then((response) => {
        const data = response?.data;
        setPos(data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const addProduct = () => {
    navigate(`/addStock/${encodeURIComponent(JSON.stringify(location))}`);
  };

  const handleEdit = (index) => {
    setEditingRow(index);
    setData({
      ...data,
      ...productLocations[index],
    });
    listGraphsByCompany(localStorage.getItem("companyName")).then((response)=>{
      const data = response?.data;
      const getGraph = data?.find(graph => parseInt(graph?.pl) === productLocations[index]?.id);
      setGraph(getGraph);
      // console.log('getGraph');
    }) 
  };

  const updateLocaitonStock = (quantity, currentQty) => {
    if (
      !location ||
      typeof location.available === "undefined" ||
      typeof location.stock === "undefined"
    ) {
      console.error("Location is not defined or missing required properties.");
      return;
    }
    const numericQuantity = parseFloat(quantity);
    const numericCurrentQty = parseFloat(currentQty);

    if (numericCurrentQty !== numericQuantity) {
      dataLocation.available += numericCurrentQty;
      dataLocation.stock -= numericCurrentQty;
      dataLocation.stock += numericQuantity;
      dataLocation.available -= numericQuantity;

      updateLocation(location.id, dataLocation).then((response) => {
        console.log(response.data);
      });
    }
  };

  const removeLocationStock = (quantity) => {
    const numericQuantity = parseFloat(quantity);
    dataLocation.available += numericQuantity;
    dataLocation.stock -= numericQuantity;
    updateLocation(location.id, dataLocation).then((response) => {
      // console.log(response.data);
    });
  };

  const handleInputChange = (index, name, value) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e, item) => {
    if (e.target.name === "cancel") {
      setEditingRow(false);
      Object.keys(data).forEach((key) => {
        data[key] = "";
      });
    } else if (
      data?.quantity < 0 ||
      data?.unitPrice < 0 ||
      data?.totalprice < 0
    ) {
      toast.error("input must not be negative");
    } else {
      updateProductLocation(data.id, data).then((response) => {
        getPlByLocation(
          location?.row,
          location?.col,
          location?.warehouseName,
          localStorage.getItem("companyName")
        );
        const graph2 = {id: graph?.id, date : data?.receivedDate, price: 0, quantity: data?.quantity, company: localStorage.getItem("companyName"), po: '', pl: data?.id};
            updateGraph(graph2?.id, graph2).then((response)=>{
              console.log('graph updated');
            })
        updateLocaitonStock(data?.quantity, item?.quantity);
        // console.log("new", data?.quantity, item?.quantity)
        // console.log("new", data?.quantity, item)
        // const updatedProducts = [...products];
        // updatedProducts[index] = data;
        // setProducts(updatedProducts);
        setEditingRow(null);
        Object.keys(data).forEach((key) => {
          data[key] = "";
        });
        toast.success(`${item?.product} is successfully updated!`);
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "product") {
      setData({
        ...data,
        company: localStorage.getItem("companyName"),
        location:
          "Row: " +
          location?.row +
          " Col: " +
          location?.col +
          " " +
          location?.warehouseName,
        warehouse: { id: location.warehouseId },
      });
    }
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = () => {
    if (showAdd) {
      const hasNull = Object.entries(data)
        .filter(([key]) => key !== "id" && key !== "warehouse")
        .some(([, value]) => value.length < 1);
      if (hasNull) {
        toast.error("Please enter all fields!");
      } else if (
        data?.quantity < 0 ||
        data?.unitPrice < 0 ||
        data?.totalprice < 0
      ) {
        toast.error("input must not be negative");
      } else {
        updateLocaitonStock(data?.quantity, 0);
        createProductLocation(data).then(async(response) => {
            const data2 = await response?.data;
            // console.log("check data", data2)
            getPlByLocation(location?.row, location?.col, location?.warehouseName, localStorage.getItem("companyName"));
           
            const graph = {date : data2?.receivedDate, price: 0, quantity: data2?.quantity, company: localStorage.getItem("companyName"), po: '', pl: data2.id};
            createGraph(graph).then((response)=>{
              // console.log('graph updated', response.data);
            })
          })
          .catch((error) => {
            toast.error(error.response.data);
          });
        toast.success("Product added successfully!");
        setShowAdd(!showAdd);
        Object.keys(data).forEach((key) => {
          data[key] = "";
        });
      }
    } else {
      setShowAdd(!showAdd);
    }
  };

  const handleCancel = () => {
    setShowAdd(!showAdd);

    Object.keys(data).forEach((key) => {
      data[key] = "";
    });
  };

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteProductLocation(item.id)
        .then((response) => {
          toast.success(response.data);
          setRefresh(!refresh);
        })
        .catch((error) => {
          toast.error(error);
        });
      removeLocationStock(item.quantity);
    }
  };

  return (
    <div  style={{minHeight: "84vh"}}>
      <div className="m-5">
        <div className="d-flex flex-row align-items-center ">
          <ToastContainer />
          <p style={{ maxHeight: "40px", fontWeight: 700, fontSize: 20 }}>
            Products at:{" "}
          </p>
          <p
            style={{
              maxHeight: "40px",
              marginLeft: "10px",
              marginTop: "4px",
              fontWeight: 500,
            }}
          >
            Warehouse: {warehouse}
            {", "}Row: {location?.row} Column: {location?.col}
          </p>
        </div>
        <div className="table-responsive" style={{ width: "100%" }}>
          <table className="table table-collapse table-hover table-bordered table-responsive" style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Receiving Date</th>
                <th scope="col">MFG Date</th>
                <th scope="col">EXP Date</th>
                <th scope="col">Supllier</th>
                <th scope="col">Batch/Lot</th>
                <th scope="col">PO</th>
                <th scope="col">Unit Price</th>
                <th scope="col">TotalPrice</th>
                <th scope="col">Stock</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productLocations?.map((item, index) => (
                <tr key={item?.id}>
                  <td>{item?.id}</td>
                  <td style={{ maxWidth: "100px" }}>
                    {editingRow === index ? (
                      <select
                        style={{ marginTop: "7px", maxWidth: "100px" }}
                        onChange={(e) =>
                          handleInputChange(index, "product", e.target.value)
                        }
                      >
                        <option value={item?.product}>{item?.product}</option>
                        {products?.map((item, key) => (
                          <option key={key} value={item?.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      item?.product
                    )}
                  </td>
                  <td>
                    {" "}
                    {editingRow === index ? (
                      <input
                        type="date"
                        className="form-control"
                        value={data?.receivedDate}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "receivedDate",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      item?.receivedDate
                    )}
                  </td>
                  <td>
                    {" "}
                    {editingRow === index ? (
                      <input
                        type="date"
                        className="form-control"
                        value={data?.mfgDate}
                        onChange={(e) =>
                          handleInputChange(index, "mfgDate", e.target.value)
                        }
                      />
                    ) : (
                      item?.mfgDate
                    )}
                  </td>
                  <td>
                    {" "}
                    {editingRow === index ? (
                      <input
                        type="date"
                        className="form-control"
                        value={data?.expDate}
                        onChange={(e) =>
                          handleInputChange(index, "expDate", e.target.value)
                        }
                      />
                    ) : (
                      item?.expDate
                    )}
                  </td>
                  <td style={{ maxWidth: "100px" }}>
                    {editingRow === index ? (
                      <select
                        style={{ marginTop: "7px", maxWidth: "100px" }}
                        onChange={(e) =>
                          handleInputChange(index, "supplier", e.target.value)
                        }
                      >
                        <option value={item?.supplier}>{item?.supplier}</option>
                        {suppliers?.map((item, key) => (
                          <option key={key} value={item?.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      item?.supplier
                    )}
                  </td>
                  <td>
                    {" "}
                    {editingRow === index ? (
                      <input
                        type="text"
                        className="form-control"
                        value={data?.batchNumber}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "batchNumber",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      item?.batchNumber
                    )}
                  </td>
                  <td style={{ maxWidth: "100px" }}>
                    {editingRow === index ? (
                      <select
                        style={{ marginTop: "7px", maxWidth: "100px" }}
                        onChange={(e) =>
                          handleInputChange(index, "po", e.target.value)
                        }
                      >
                        <option value={item?.po}>{item?.po}</option>
                        {pos?.map((item, key) => (
                          <option key={key} value={item?.po}>
                            {item.po}
                          </option>
                        ))}
                      </select>
                    ) : (
                      item?.po
                    )}
                  </td>
                  <td>
                    {" "}
                    {editingRow === index ? (
                      <input
                        type="number"
                        min="0"
                        max={Number.MAX_VALUE}
                        className="form-control"
                        value={data?.unitPrice}
                        onChange={(e) =>
                          handleInputChange(index, "unitPrice", e.target.value)
                        }
                      />
                    ) : (
                      item?.unitPrice
                    )}
                  </td>
                  <td>
                    {" "}
                    {editingRow === index ? (
                      <input
                        type="number"
                        min="0"
                        max={Number.MAX_VALUE}
                        className="form-control"
                        value={data?.totalprice}
                        onChange={(e) =>
                          handleInputChange(index, "totalprice", e.target.value)
                        }
                      />
                    ) : (
                      item?.totalprice
                    )}
                  </td>
                  <td>
                    {" "}
                    {editingRow === index ? (
                      <input
                        type="number"
                        min="0"
                        max={Number.MAX_VALUE}
                        className="form-control"
                        value={data?.quantity}
                        onChange={(e) =>
                          handleInputChange(index, "quantity", e.target.value)
                        }
                      />
                    ) : (
                      item?.quantity
                    )}
                  </td>

                  <td className="d-flex flex-row">
                    {editingRow === index ? (
                      <>
                        <button
                          className="btn btn-secondary shadow hover-over btn-sm "
                          name="cancel"
                          onClick={(e) => handleSave(e, item)}
                          style={{ marginRight: "5px" }}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn shadow hover-over btn-success btn-sm"
                          onClick={(e) => handleSave(e, item)}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn shadow hover-over btn-primary btn-sm"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleDelete(item)}
                      className="btn bg-danger shadow hover-over border-0 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAdd && (
          <div className="d-flex justify-content-between">
            <form onSubmit={""} className="input-group d-flex flex-row">
              <div className="d-flex flex-column fw-bold">
                <label style={{ fontSize: 14 }}>Product</label>
                <select
                  style={{ maxWidth: "100px", height: "35px" }}
                  onChange={handleChange}
                  name="product"
                >
                  <option>Select:</option>
                  {products?.map((item, key) => (
                    <option key={key} value={item?.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex flex-column fw-bold">
                <label style={{ fontSize: 14 }}>Receiving Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="receivedDate"
                  placeholder="Receiving Date"
                  value={data?.receivedDate}
                  onChange={handleChange}
                  required
                  style={{ marginLeft: "5px" }}
                />
              </div>
              <div
                className="d-flex flex-column fw-bold "
                style={{ marginLeft: "5px" }}
              >
                <label style={{ fontSize: 14 }}>Manufacturing Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="mfgDate"
                  placeholder="MFG Date"
                  value={data?.mfgDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div
                className="d-flex flex-column fw-bold "
                style={{ marginLeft: "5px" }}
              >
                <label style={{ fontSize: 14 }}>Expiratoin Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="expDate"
                  placeholder="EXP Date"
                  value={data?.expDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div
                className="d-flex flex-column fw-bold "
                style={{
                  marginLeft: "5px",
                  width: "130px",
                }}
              >
                <label style={{ fontSize: 14, marginBottom: "1px" }}>
                  Supplier
                </label>
                <select
                  style={{ height: "35px" }}
                  onChange={handleChange}
                  name="supplier"
                >
                  <option>Select:</option>
                  {suppliers?.map((item, key) => (
                    <option key={key} value={item?.name}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div
                className="d-flex flex-column fw-bold "
                style={{ marginLeft: "5px" }}
              >
                <label style={{ fontSize: 14 }}>Batch</label>
                <input
                  type="text"
                  className="form-control"
                  name="batchNumber"
                  placeholder="Batch/Lot"
                  value={data?.batchNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div
                className="d-flex flex-column fw-bold "
                style={{ marginLeft: "5px", width: "130px" }}
              >
                <label style={{ fontSize: 14, marginBottom: "1px" }}> PO</label>
                <select
                  style={{ height: "35px" }}
                  onChange={handleChange}
                  name="po"
                >
                  <option>Select</option>
                  {pos?.map((item, key) => (
                    <option key={key} value={item?.po}>
                      {item?.po}
                    </option>
                  ))}
                </select>
              </div>

              <div
                className="d-flex flex-column fw-bold "
                style={{ marginLeft: "5px" }}
              >
                <label style={{ fontSize: 14 }}>Unit Price</label>
                <input
                  type="number"
                  min="0"
                  max={Number.MAX_VALUE}
                  className="form-control"
                  name="unitPrice"
                  placeholder="Unit Price"
                  value={data?.unitPrice}
                  onChange={handleChange}
                  required
                />
              </div>

              <div
                className="d-flex flex-column fw-bold "
                style={{ marginLeft: "5px" }}
              >
                <label style={{ fontSize: 14 }}>Total Price</label>
                <input
                  type="number"
                  min="0"
                  max={Number.MAX_VALUE}
                  className="form-control"
                  name="totalprice"
                  placeholder="Total Price"
                  value={data?.totalprice}
                  onChange={handleChange}
                  required
                />
              </div>

              <div
                className="d-flex flex-column fw-bold "
                style={{ marginLeft: "5px" }}
              >
                <label style={{ fontSize: 14 }}>Quantity</label>
                <input
                  type="number"
                  min="0"
                  max={Number.MAX_VALUE}
                  className="form-control"
                  name="quantity"
                  placeholder="quantity"
                  value={data?.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
          </div>
        )}

        <div
          className="d-flex flex-column text-end w-100"
          style={{ width: "100%", marginTop: 0 }}
        >
          <div className="mb-2" style={{ width: "100%" }}>
            <button
              style={{
                float: "right",
                maxWidth: "105px",
                marginLeft: "10px",
                width: "100%",
              }}
              className={`${
                showAdd ? "bg-success" : "bg-secondary"
              } text-white mt-3`}
              onClick={handleClick}
            >
              {" "}
              {showAdd === true ? "Confirm" : "Add Product"}
            </button>
            {showAdd && (
              <button
                style={{ float: "right", maxWidth: "90px" }}
                className="bg-secondary text-white mt-3"
                onClick={handleCancel}
              >
                {" "}
                Cancel{" "}
              </button>
            )}
          </div>
          <p
            className=""
            style={{ backgroundColor: "#6AF86F", fontWeight: "bold" }}
          >
            Total: {total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewLocation;
