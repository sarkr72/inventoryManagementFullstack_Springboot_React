import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { createProduct } from "../services/ProductService";

const AddProduct = () => {
  // const location = useLocation();
  // const { updateProduct } = location.state || {};
  // const { updateProduct } = useParams();
  const navigate = useNavigate();
  // const { location } = useParams();

  const [data, setData] = useState({
    name: "",
    category: "",
    restockLevel: "",
    unitPrice: "",
    quantity: 0,
    company: { id: localStorage.getItem("companyId") },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasNull = Object.values(data).some((value) => value.length < 1);
    if (!hasNull) {
      try {
        // console.log(data)
        // createProduct(data).then((response)=>{
        //   const data = response?.data;
        //   navigate("/products");
        //   toast.success("Product Added Successfully!");
        // })
        const response = await createProduct(data);
        const data2 = response.data;
        navigate("/products");
        toast.success("Product Added Successfully!");
      } catch (error) {
        console.log(error);
        if (error.response.status === 500) {
          toast.error("Product already exists");
        } else {
          toast.error("Product already exists");
        }
      }
    }
  };
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        margin: 0,
        backgroundImage: "url(/assets/images/registrationImage.jpeg)",
        backgroundSize: "cover",
      }}
    >
      <ToastContainer />
      <div
        style={{ minHeight: "90vh" }}
        className="container d-flex flex-column justify-content-center align-items-center"
      >
        <div className="bg-white p-2 rounded-3 shadow-lg mb-2">
          <h3>Add Product</h3>
        </div>
        <div
          className="d-flex flex-row border rounded-3 p-3 bg-white shadow"
          style={{ width: "80%" }}
        >
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label">Product Name:</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter product name"
                  value={data?.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label">
                Product Category:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  placeholder="Enter category name"
                  value={data?.category}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label">
                Reorder Quantity:
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  min="0"
                  max={Number.MAX_VALUE}
                  className="form-control"
                  name="restockLevel"
                  placeholder="Reorder quantity"
                  value={data?.reorderLevel}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label">Unit Price:</label>
              <div className="col-sm-9">
                <input
                  type="number"
                  min="0"
                  max={Number.MAX_VALUE}
                  step="any"
                  className="form-control"
                  name="unitPrice"
                  placeholder="Unit price"
                  value={data?.unitPrice}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={{ width: "80px" }} className="m-auto mt-3 text-center">
              <button
                
                type="submit"
                className=" btn btn-primary w-100"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
