import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createProductLocation,
  deleteProductLocation,
  listProductLocations,
  listProductLocationsByProduct,
  updateProductLocation,
} from "../services/ProductLocations";
import { listWarehouses } from "../services/WarehouseService";
import { listLocations, updateLocation } from "../services/LocationService";
import { listSupplier } from "../services/SupplierService";
import {
  purchaseOrderList,
  purchaseOrderListByCompany,
} from "../services/PurchaseOrderService";
import { getCompany } from "../services/CompanyService";
import "../css/plpage.css";
import { createGraph, listGraphsByCompany, updateGraph } from "../services/GraphService";

const ProductInventory = () => {
  // const { product } = useParams();
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editableData, setEditableData] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [pos, setPos] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [graph, setGraph] = useState(null);
  const [data, setData] = useState({
    supplier: "",
    unitPrice: "",
    quantity: 0,
    totalprice: 0,
    mfgDate: "",
    expDate: "",
    location: "",
    batchNumber: "",
    po: "",
    receivedDate: "",
    product: product?.name,
    company: localStorage.getItem("companyName"),
  });
  const [dataLocation, setDataLocation] = useState({
    warehouse: { id: "" },
    available: "",
    id: "",
    row: "",
    col: "",
    maxCapacity: "",
    isEmpty: false,
    stock: "",
  });

  useEffect(() => {
    getProductInventory();
    // getWarehouses();
    const id = localStorage.getItem("companyId");
    getSuppliers(id);
    getPos(localStorage.getItem("companyName"));
    console.log(id);
    // getTotal();
    // setCompanyId(localStorage.getItem("companyName"));
  }, []);

  const getProductInventory = () => {
    listProductLocationsByProduct(product.name, product.company.name)
      // listProductLocations()
      .then((response) => {
        const data = response?.data;
        setProducts(data);
        const total = data.reduce((acc, product) => acc + product.quantity, 0);
        const formatted = new Intl.NumberFormat().format(total);
        setTotal(formatted);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const getSuppliers = (id) => {
    getCompany(id)
      .then((response) => {
        const data = response?.data;
        setSuppliers(data?.suppliers);
        setWarehouses(data?.warehouses);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const getPos = (id) => {
    purchaseOrderListByCompany(id)
      .then((response) => {
        const data = response?.data;
        setPos(data);
        console.log(data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const handleEdit = (index) => {
    setEditingRow(index);
    setEditableData(products[index]);
    loadLocations(products[index]?.location?.warehouse?.name);
    listGraphsByCompany(localStorage.getItem("companyName")).then((response)=>{
      const data = response?.data;
      const getGraph = data?.find(graph => parseInt(graph?.pl) === products[index]?.id);
      setGraph(getGraph);
      console.log('getGraph', getGraph);
    }) 
    // localStorage.clear();
  };

  const loadLocations = (value) => {
    const warehouse = warehouses.find((w) => w.name === value);
    const locs = warehouse ? warehouse.locations : [];
    setLocations(locs);
  };

  const handleInputChange = (index, field, value) => {
    if (field === "warehouse") {
      loadLocations(value);
    }
    // const updatedData = [...editableData];
    // updatedData[field] = value;
    // setEditableData(updatedData);
    // if (field === "supplier") {
    //   const selectedSupplier = JSON.parse(value);
    //   setEditableData((prevData) => ({
    //     ...prevData,
    //     supplier: {
    //       id: selectedSupplier?.item?.id,
    //       name: selectedSupplier?.item?.name,
    //     },
    //   }));
    // } else if (field === "Location") {
    //   const selectedLocation = JSON.parse(value);
    //   setEditableData((prevData) => ({
    //     ...prevData,
    //     location: {
    //       id: selectedLocation?.id,
    //       row: selectedLocation?.row,
    //       col: selectedLocation.col,
    //     },
    //   }));
    // } else if (field === "po") {
    //   const selectedPo = JSON.parse(value);
    //   setEditableData((prevData) => ({
    //     ...prevData,
    //     po: {
    //       id: selectedPo?.item?.id,
    //       po: selectedPo?.item?.po,
    //     },
    //   }));
    // } else {

    if (field === "location") {
      const location = JSON.parse(value).item;
      const l = `Row: ${location?.row} Col: ${location?.col} ${location?.warehouseName}`;
      setEditableData((prevData) => ({
        ...prevData,
        [field]: l,
      }));
      setSelectedLocation(location);
      setDataLocation((prevData) => ({
        ...prevData,
        warehouse: { id: location.warehouseId },
        available: location.available,
        id: location.id,
        row: location.row,
        col: location.col,
        maxCapacity: location.maxCapacity,
        isEmpty: false,
        stock: location.stock,
      }));
    } else {
      setEditableData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const handleSave = async (e, index) => {
    // const updatedProduct = editableData[index];
    if (e.target.name === "cancel") {
      setEditingRow(false);
    } else {
      try {
        updateProductLocation(editableData.id, editableData).then(
          async(response) => {
            const data = await response?.data;
            const graph2 = {id: graph?.id, date : data?.receivedDate, price: 0, quantity: data?.quantity, company: localStorage.getItem("companyName"), po: '', pl: data?.id};
            updateGraph(graph?.id, graph2).then((response)=>{
              console.log('graph updated');
            })
            updateLocaitonStock(
              editableData.quantity,
              products[index].quantity
            );
            getProductInventory();
          }
        );

        const updatedProducts = [...products];
        // updatedProducts[index] = response.data;
        updatedProducts[index] = editableData;
        setProducts(updatedProducts);

        setEditingRow(null);
        // window.location.reload();
      } catch (error) {
        console.error("There was an error updating the product:", error);
      }
    }
  };

  const updateLocaitonStock = (quantity, currentQty) => {
    if (
      !dataLocation ||
      typeof dataLocation.available === "undefined" ||
      typeof dataLocation.stock === "undefined"
    ) {
      console.error("Location is not defined or missing required properties.");
      return;
    }
    const numericQuantity = parseFloat(quantity);
    const numericCurrentQty = parseFloat(currentQty);
    setDataLocation((prevDataLocation) => ({
      ...prevDataLocation,
      location: selectedLocation,
    }));
    if (numericCurrentQty !== numericQuantity) {
      dataLocation.available += numericCurrentQty;
      dataLocation.stock -= numericCurrentQty;
      dataLocation.stock += numericQuantity;
      dataLocation.available -= numericQuantity;
      updateLocation(dataLocation.id, dataLocation).then((response) => {
        // console.log(response.data);
        // Object.keys(dataLocation).forEach((key) => {
        //   dataLocation[key] = "";
        // });
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

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteProductLocation(item.id)
        .then((response) => {
          toast.success(response.data);
          getProductInventory();
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
      removeLocationStock(item.quantity);
    }
  };

  // const getTotal = () => {
  //   setTotal(products.reduce((acc, product) => acc + product.quantity, 0));
  // };

  const handleClick = () => {
    if (showAdd) {
      const hasNull = Object.entries(data)
        .filter(([key]) => key !== "id" && key !== "warehouse")
        .some(([, value]) => value.length < 1);
      if (hasNull) {
        toast.error("Please enter all fields!");
      } else {
        createProductLocation(data)
          .then(async(response) => {
            const id = await response?.data?.id;
            
            const graph = {date : data?.receivedDate, price: 0, quantity: data?.quantity, company: localStorage.getItem("companyName"), po: '', pl: id};
            createGraph(graph).then((response)=>{
              console.log('graph updated');
            })
            setProducts([...products, response?.data]);
            updateLocaitonStock(data.quantity, 0);
            getProductInventory();
          })
          .catch((error) => {
            toast.error(error.response.data);
          });

        toast.success("Stock added successfully!");
        setShowAdd(!showAdd);
        // Object.keys(data).forEach((key) => {
        //   data[key] = "";
        // });
      }
    } else {
      setShowAdd(!showAdd);
    }
  };

  const handleClick2 = () => {
    setShowAdd(!showAdd);

    Object.keys(data).forEach((key) => {
      data[key] = "";
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "warehouse") {
      loadLocations(value);
    }
    if (name === "location") {
      const location = JSON.parse(value).item;
      const l = `Row: ${location?.row} Col: ${location?.col} ${location?.warehouseName}`;
      setData((prevData) => ({
        ...prevData,
        [name]: l,
      }));
      setSelectedLocation(location);
      setDataLocation((prevData) => ({
        ...prevData,
        warehouse: { id: location.warehouseId },
        available: location.available,
        id: location.id,
        row: location.row,
        col: location.col,
        maxCapacity: location.maxCapacity,
        isEmpty: false,
        stock: location.stock,
      }));
    } else {
      // console.log("test", dataLocation);
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    // if (name === "supplier") {
    //   const selectedSupplier = JSON.parse(value);
    //   setData((prevData) => ({
    //     ...prevData,
    //     supplier: value,
    //   }));
    // }  else if (name === "po") {
    //   const selectedPo = JSON.parse(value);
    //   console.log(selectedPo)
    //   setData((prevData) => ({
    //     ...prevData,
    //     po: {
    //       id: selectedPo?.id,
    //       po: selectedPo?.po,
    //     },
    //   }));
    // } else {
  };

  const getLocation = (location) => {
    let value = "";
    const arr = location.split(" ");
    arr.slice(0, -1).forEach((item) => {
      value += item + " ";
    });
    return value;
  };

  return (
    <div  style={{minHeight: "85vh"}}>
      <div className="offset-1">
        <h2>Product Inventory</h2>
        <p>
          Product Name: <span className="fw-bold">{product.name}</span>
          {/* {", "}Unit Price: <span className="fw-bold"> {product.unitPrice}</span> */}
        </p>
      </div>
      <ToastContainer />
      <div className="m-3" style={{ fontSize: 13 }}>
        <div className="d-flex flex-column" style={{ maxWidth: "100%" }}>
          <div style={{ width: "100%" }} className="">
            <div className="table-responsive" style={{ width: "100%" }}>
              <table className="table table-hover table-bordered table-responsive" style={{ border: '2px solid black' }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        backgroundColor: "#3C3A7D",
                        textAlign: "center",
                      }}
                      className=" text-white"
                      scope="col"
                    >
                      #
                    </th>
                    <th
                      style={{
                        backgroundColor: "#3C3A7D",
                        textAlign: "center",
                      }}
                      className=" text-white"
                      scope="col"
                    >
                      Receiving Date
                    </th>
                    <th
                      style={{
                        backgroundColor: "#3C3A7D",
                        textAlign: "center",
                      }}
                      className=" text-white"
                      scope="col"
                    >
                      MFG Date
                    </th>
                    <th
                      style={{
                        backgroundColor: "#3C3A7D",
                        textAlign: "center",
                      }}
                      className="text-white"
                      scope="col"
                    >
                      Exp Date
                    </th>
                    <th
                      style={{
                        backgroundColor: "#3C3A7D",
                        textAlign: "center",
                      }}
                      className=" text-white"
                      scope="col"
                    >
                      Supplier
                    </th>
                    <th
                      style={{
                        backgroundColor: "#3C3A7D",
                        maxWidth: "65px",
                        padding: "0px",
                        paddingBottom: "7px",
                        textAlign: "center",
                      }}
                      className=" text-white"
                      scope="col"
                    >
                      Warehouse{" "}
                    </th>
                    <th
                      style={{
                        backgroundColor: "#3C3A7D",
                        textAlign: "center",
                      }}
                      className=" text-white"
                      scope="col"
                    >
                      Location
                    </th>
                    <th
                      style={{
                        backgroundColor: "#3C3A7D",
                        textAlign: "center",
                      }}
                      className="text-white"
                      scope="col"
                    >
                      Batch
                    </th>
                    <th
                      style={{
                        backgroundColor: "#3C3A7D",
                        textAlign: "center",
                      }}
                      className=" text-white"
                      scope="col"
                    >
                      PO
                    </th>
                    <th
                      style={{
                        backgroundColor: "#3C3A7D",
                        textAlign: "center",
                      }}
                      className=" text-white"
                      scope="col"
                    >
                      Unit Price
                    </th>
                    <th
                      style={{
                        backgroundColor: "#3C3A7D",
                        textAlign: "center",
                      }}
                      className=" text-white"
                      scope="col"
                    >
                      Total Price
                    </th>
                    <th
                      style={{
                        backgroundColor: "#3C3A7D",
                        textAlign: "center",
                      }}
                      className="text-white"
                      scope="col"
                    >
                      Qty
                    </th>
                    <th
                      style={{
                        backgroundColor: "#3C3A7D",
                        textAlign: "center",
                      }}
                      className=" text-white"
                      scope="col"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product, index) => (
                      <>
                        <tr key={index}>
                          <td
                            style={{
                              backgroundColor: "#3C3A7D",
                              color: "white",
                            }}
                          >
                            {product.id}
                          </td>

                          <td>
                            {" "}
                            {editingRow === index ? (
                              <>
                                <input
                                  type="date"
                                  value={editableData.receivedDate}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "receivedDate",
                                      e.target.value
                                    )
                                  }
                                />
                              </>
                            ) : (
                              product?.receivedDate
                            )}
                          </td>

                          <td>
                            {" "}
                            {editingRow === index ? (
                              <input
                                type="date"
                                value={editableData?.mfgDate}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "mfgDate",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              product?.mfgDate
                            )}
                          </td>

                          <td>
                            {" "}
                            {editingRow === index ? (
                              <input
                                type="date"
                                value={editableData?.expDate}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "expDate",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              product?.expDate
                            )}
                          </td>

                          <td style={{ maxWidth: "100px" }}>
                            {" "}
                            {editingRow === index ? (
                              <select
                                style={{ marginTop: "7px", maxWidth: "100px" }}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "supplier",
                                    e.target.value
                                  )
                                }
                              >
                                {/* <option
                                  value={JSON.stringify(product?.supplier)}
                                >
                                  {product?.supplier?}
                                </option> */}
                                <option value={product?.supplier}>
                                  {product?.supplier}
                                </option>
                                {suppliers?.map((item, key) => (
                                  <option key={key} value={item?.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              product?.supplier
                            )}
                          </td>
                          <td style={{ maxWidth: "100px" }}>
                            {" "}
                            {editingRow === index ? (
                              <select
                                style={{ marginTop: "7px", width: "60px" }}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "warehouse",
                                    e.target.value
                                  )
                                }
                              >
                                {warehouses?.map((item, key) => (
                                  <option key={key} value={item?.name}>
                                    {item?.name}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              product?.location.split(" ")[4]
                            )}
                          </td>

                          <td>
                            {" "}
                            {editingRow === index ? (
                              <select
                                style={{ marginTop: "7px" }}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "location",
                                    e.target.value
                                  )
                                }
                              >
                                <option value={product?.location}>
                                  {" "}
                                  {getLocation(product?.location)}
                                </option>
                                {/* <option>Select</option> */}
                                {locations?.map((item, key) => (
                                  <option
                                    key={key}
                                    value={JSON.stringify({ item })}
                                  >
                                    {`Row: ${item?.row} Col: ${item?.col}`}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <>{getLocation(product?.location)}</>
                            )}
                          </td>

                          <td>
                            {" "}
                            {editingRow === index ? (
                              <input
                                type="text"
                                className="form-control"
                                value={editableData?.batchNumber}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "batchNumber",
                                    e.target.value
                                  )
                                }
                                style={{ fontSize: 13 }}
                              />
                            ) : (
                              product?.batchNumber
                            )}
                          </td>
                          <td>
                            {" "}
                            {editingRow === index ? (
                              <select
                                style={{ marginTop: "7px" }}
                                onClick={(e) =>
                                  handleInputChange(index, "po", e.target.value)
                                }
                              >
                                <option value={product?.po}>
                                  {product?.po}
                                </option>
                                {pos?.map((item, key) => (
                                  <option key={key} value={item?.po}>
                                    {item?.po}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              product?.po
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
                                style={{ fontSize: 13 }}
                                value={editableData?.unitPrice}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "unitPrice",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              product?.unitPrice
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
                                value={editableData?.totalprice}
                                style={{ fontSize: 13 }}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "totalprice",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              product?.totalprice
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
                                style={{ fontSize: 13 }}
                                value={editableData?.quantity}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "quantity",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              product?.quantity
                            )}
                          </td>

                          <td className="d-flex flex-row">
                            {editingRow === index ? (
                              <div className="d-flex flex-row">
                                <button
                                  className="btn btn-secondary shadow hover-over btn-sm "
                                  name="cancel"
                                  onClick={(e) => handleSave(e, index)}
                                  style={{ marginRight: "5px" }}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="btn btn-success shadow hover-over btn-sm "
                                  name="save"
                                  onClick={(e) => handleSave(e, index)}
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <button
                                className="btn btn-primary shadow hover-over btn-sm"
                                onClick={() => handleEdit(index)}
                              >
                                Edit
                              </button>
                            )}
                            {editingRow !== index && (
                              <button
                                style={{ marginLeft: "5px" }}
                                className="btn bg-danger shadow hover-over border-0 text-white"
                                onClick={() => handleDelete(product)}
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
            {showAdd && (
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column fw-bold">
                    <label style={{ fontSize: 13 }}>Receiving Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="receivedDate"
                      placeholder="Receiving Date"
                      value={data?.receivedDate}
                      onChange={handleChange}
                      required
                      style={{ maxWidth: "115px" }}
                    />
                  </div>
                  <div
                    className="d-flex flex-column fw-bold "
                    style={{ marginLeft: "5px" }}
                  >
                    <label style={{ fontSize: 13 }}>Manufacturing Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="mfgDate"
                      placeholder="MFG Date"
                      value={data?.mfgDate}
                      onChange={handleChange}
                      required
                      style={{ maxWidth: "135px" }}
                    />
                  </div>
                  <div
                    className="d-flex flex-column fw-bold "
                    style={{ marginLeft: "5px" }}
                  >
                    <label style={{ fontSize: 13 }}>Expiratoin Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="expDate"
                      placeholder="EXP Date"
                      value={data?.expDate}
                      onChange={handleChange}
                      required
                      style={{ maxWidth: "125px" }}
                    />
                  </div>
                  <div
                    className="d-flex flex-column fw-bold "
                    style={{
                      marginLeft: "5px",
                      width: "130px",
                    }}
                  >
                    <label style={{ fontSize: 13, marginBottom: "1px" }}>
                      Supplier
                    </label>
                    <select
                      style={{ height: "35px" }}
                      onChange={handleChange}
                      name="supplier"
                    >
                      <option>Select</option>
                      {suppliers?.map((item, key) => (
                        <option key={key} value={item?.name}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    className="d-flex flex-column fw-bold "
                    style={{
                      marginLeft: "5px",
                      width: "130px",
                    }}
                  >
                    <label style={{ fontSize: 13, marginBottom: "1px" }}>
                      Warehouse
                    </label>
                    <select
                      style={{ height: "35px" }}
                      onClick={handleChange}
                      name="warehouse"
                    >
                      <option>Select</option>
                      {warehouses?.map((item, key) => (
                        <option key={key} value={item?.name}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    className="d-flex flex-column fw-bold "
                    style={{
                      marginLeft: "5px",
                      width: "130px",
                    }}
                  >
                    <label style={{ fontSize: 13, marginBottom: "1px" }}>
                      Location
                    </label>
                    <select
                      style={{ height: "35px" }}
                      onChange={handleChange}
                      name="location"
                    >
                      <option>Select</option>
                      {locations?.map((item, key) => (
                        <option key={key} value={JSON.stringify({ item })}>
                          {`Row: ${item?.row} Col: ${item?.col}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    className="d-flex flex-column fw-bold "
                    style={{ marginLeft: "5px" }}
                  >
                    <label style={{ fontSize: 13 }}>Batch</label>
                    <input
                      type="text"
                      className="form-control"
                      name="batchNumber"
                      placeholder="Batch/Lot"
                      value={data?.batch}
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
                    <label style={{ fontSize: 13, marginBottom: "1px" }}>
                      PO
                    </label>
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
                    <label style={{ fontSize: 13 }}>Unit Price</label>
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
                    <label style={{ fontSize: 13 }}>Total Price</label>
                    <input
                      type="number"
                      min="0"
                      max={Number.MAX_VALUE}
                      className="form-control"
                      name="totalprice"
                      placeholder="Total Price"
                      value={data?.totalValue}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div
                    className="d-flex flex-column fw-bold "
                    style={{ marginLeft: "5px" }}
                  >
                    <label style={{ fontSize: 13 }}>Quantity</label>
                    <input
                      type="number"
                      min="0"
                      onInput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
                      max={Number.MAX_VALUE}
                      className="form-control"
                      name="quantity"
                      placeholder="Quantity"
                      value={data?.qty}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
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
                    maxWidth: "90px",
                    marginLeft: "10px",
                    width: "100%",
                  }}
                  className="bg-secondary text-white mt-3"
                  onClick={handleClick}
                >
                  {" "}
                  {showAdd === true ? "Confirm" : "Add Stock"}
                </button>
                {showAdd && (
                  <button
                    style={{ float: "right", maxWidth: "90px" }}
                    className="bg-secondary text-white mt-3"
                    onClick={handleClick2}
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
      </div>
    </div>
  );
};

export default ProductInventory;
