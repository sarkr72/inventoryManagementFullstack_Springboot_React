import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createWarehouse, updateWarehouse } from "../services/WarehouseService";

const AddWarehouse = () => {
  const { warehouse } = useParams();
  const navigate = useNavigate();
  const [warehouse2, setWarehouse] = useState(null);
  const [data, setData] = useState({
    name: "",
    address: "",
    company: { id: "" },
    maxCapacity: "",
    id: "",
  });

  useEffect(() => {
    if (warehouse) {
      try {
        const decoded = JSON.parse(decodeURIComponent(warehouse));
        setWarehouse(decoded);
        setData(decoded);
        data.company.id = localStorage.getItem("companyId");
      } catch (error) {
        console.log(error);
      }
    } else {
      data.company.id = localStorage.getItem("companyId");
    }
  }, [warehouse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (warehouse) {
      updateWarehouse(data.id, data).then((response) => {
        navigate("/manageWarehouses");
      });
    } else {
      createWarehouse(data).then((response) => {
        navigate("/manageWarehouses");
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="text-white shadow-lg mb-5 mt-5 d-flex flex-column col-lg-6 m-auto bg-dark p-4 border rounded-3">
      <div
        style={{
          height: "500px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          paddingTop: "30px",
        }}
        className="d-flex flex-column justify-content-center"
      >
        <div className="mb-5 d-flex" style={{ marginTop: -80 }}>
          {warehouse && <h4 className="m-auto mt-3">Update Warehouse</h4>}
          {!warehouse && <h4 className="m-auto mt-3">Add Warehouse</h4>}
        </div>
        <form
          style={{ marginTop: "40px" }}
          onSubmit={handleSubmit}
          className="input-group d-flex flex-column justify-content-center align-items-center"
        >
          <div className="row mb-3">
            <label className="col-lg-3 col-md-4 col-sm-12 col-form-label">
              Name:
            </label>
            <div className="col-lg-9 col-md-8 col-sm-12">
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter warehouse name"
                value={data?.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-lg-3 col-md-4 col-sm-12 col-form-label">
              Address:
            </label>
            <div className="col-lg-9 col-md-8 col-sm-12">
              <textarea
                style={{ width: "300px" }}
                className="form-control"
                name="address"
                placeholder="Enter warehouse address"
                value={data?.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-lg-3 col-md-4 col-sm-12 col-form-label">
              Capacity:
            </label>
            <div className="col-lg-9 col-md-8 col-sm-12">
              <input
                style={{ width: "300px" }}
                type="number"
                min="0"
                max={Number.MAX_VALUE}
                className="form-control"
                name="maxCapacity"
                placeholder="Enter capacity"
                value={data?.maxCapacity}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div
            className="m-auto mt-3 text-center"
            style={{ maxWidth: "100px" }}
          >
            <button
              type="submit"
              style={{ marginTop: "20px" }}
              //   onCanPlayThrough={(e) => handleSubmit(e)}
              className="btn btn-primary w-100 mb-2"
            >
              {warehouse != null ? "Update Warehouse" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWarehouse;
