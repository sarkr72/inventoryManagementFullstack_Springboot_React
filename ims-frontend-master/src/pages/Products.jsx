import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/homepage.css'
import { useEffect } from 'react';
import { deleteProduct, productsList, productsListByCompany, updateProduct } from '../services/ProductService';
import { ToastContainer, toast } from "react-toastify";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Products = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editableData, setEditableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const role = sessionStorage.getItem('role');

  const [data, setData] = useState(
    {
      name: "",
      category: "",
      restockLevel: "",
      unitPrice: ""
    }

  );

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = () => {
    productsListByCompany(localStorage.getItem("companyId")).then((response) => {
      const data = response?.data;
      setProducts(data);
    }).catch(error => {
      toast.error(error.response.data);
    })
  }

  const onChange = (e) => {
    setShowFilters(true);
    setInput(e.target.value);
  }

  const handleClick = (e, product) => {
    if (e.target.name === "cancel") {
      setEditingRow(null);
    } else {
      navigate('/productInventory', { state: { product } });
    }
  }

  const addProduct = () => {
    navigate("/admin/addProduct");
  }

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteProduct(item.id).then((response) => {
        toast.success("Item Deleted Successfully!");
        getProducts();
      })
    }
  }

  const handleUpdate = (e, index) => {
    if (e.target.name === "confirm") {
      updateProduct(editableData?.id, editableData).then((response) => {
        getProducts();
        toast.success("Item Updated Successfully!");
        setEditingRow(null);
        setEditableData(null)
      }).catch((error) => {
        console.log(error);
      })

    } else {
      setEditingRow(index);
      setEditableData(products[index])
    }
    // navigate(`/admin/addProduct/${encodeURIComponent(JSON.stringify(updateProduct))}`, { state: { updateProduct } });
  }

  //filter products by product name
  const filteredProducts = products.filter((product) =>
    `${product.name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (index, name, value) => {
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="container" style={{ minHeight: '100vh' }}>
      <ToastContainer />


      <div className='m-5'>
        <Row>
         
          <div as={Col} className="container d-flex mb-5" style={{ maxWidth: '600px' }}>
            <input onChange={(e) => setSearchTerm(e.target.value)} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" className="btn btn-primary" data-mdb-ripple-init >search</button>
          </div>
        </Row>

        <div className='p-3 roundd-3 shadow-sm border' style={{ background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)' }}>
        <h2 className="container ml-5" as={Col} style={{ marginTop: -15 }}>Products</h2>
          <table className="table table-bordered "style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
            <thead>
              {/* <tr key={"header"}>
              {Object.keys(initState[0]).map((key) => (
                <th>{key}</th>
              ))}
            </tr> */}
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category</th>
                <th scope="col">Product Name</th>
                <th scope="col">Restock Level</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item, index) => (
                <tr key={item.id} >
                  {/* {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))} */}
                  <td style={{ border: 'none' }}>{item.id}</td>
                  <td>
                    {" "}
                    {editingRow === index ? (
                      <>
                        <input
                          type="text"
                          className="form-control"
                          value={editableData?.category}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "category",
                              e.target.value
                            )
                          }
                          style={{ maxWidth: "130px" }}
                        />
                      </>
                    ) : (
                      item?.category
                    )}
                  </td>
                  <td style={{ backgroundColor: "#d0f1b9", fontWeight: 640 }}>
                    {" "}
                    {editingRow === index ? (
                      <>
                        <input
                          type="text"
                          className="form-control"
                          value={editableData?.name}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          style={{ maxWidth: "130px" }}
                        />
                      </>
                    ) : (
                      item?.name
                    )}
                  </td>
                  <td>
                    {" "}
                    {editingRow === index ? (
                      <>
                        <input
                          type="number"
                          className="form-control"
                          value={editableData?.restockLevel}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "restockLevel",
                              e.target.value
                            )
                          }
                          style={{ maxWidth: "130px" }}
                        />
                      </>
                    ) : (
                      item?.restockLevel
                    )}
                  </td>

                  <td className='d-flex flex-row' >
                    <button name={editingRow === index ? "cancel" : "open"} style={{ fontWeight: 640, backgroundColor: editingRow === index ? "" : "#d0f1b9", color: editingRow === index ? "white" : "" }} onClick={(e) => handleClick(e, item)} className={` btn border-0 ${editingRow === index ? "bg-secondary" : ""}`}>{editingRow === index ? "Cancel" : "Open"}</button>
                    {role === "ROLE_MANAGER" && (
                      <>
                        <button name={editingRow === index ? "confirm" : "edit"} style={{ marginLeft: "10px" }} onClick={(e) => handleUpdate(e, index)} className={`btn ${editingRow === index ? "bg-success" : "bg-primary"}  border-0 text-white`}>{editingRow === index ? "Confirm" : "Edit"}</button>
                        <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(item)} className='btn bg-danger border-0 text-white'>Delete</button>

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
            <div style={{ marginTop: 10, float: "right" }} className="float-right">
              <button type="submit" onClick={addProduct} className="btn btn-secondary text-white w-10  mb-2">
                Add Product
              </button>
            </div>
          </>)}

      </div>
    </div>


  );
}

export default Products;