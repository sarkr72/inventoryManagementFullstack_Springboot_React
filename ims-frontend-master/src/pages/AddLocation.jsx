import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createLocation, updateLocation } from "../services/LocationService";
// import img1 from '../../public/assets/images/registrationImage'

const AddLocation = () => {
  const [data, setData] = useState({
    row: "",
    col: "",
    isEmpty: false,
    maxCapacity: "",
    warehouse: { id: 0 },
    stock: 0,
    id: 0,
    available: 0,
  });
  const { location } = useParams();
  const locations = useLocation();
  const { id } = locations?.state || "";
  // const { warehouse } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (location) {
      try {
        const decoded = JSON.parse(decodeURIComponent(location));

        setData({
          ...data,
          ...decoded,
          warehouse: { id: decoded?.warehouseId },
        });
      } catch (error) {
        console.log(error);
      }
    } else if (id) {
      setData({
        ...data,
        warehouse: { id: id },
      });
    }
  }, [location, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      updateLocation(data.id, data)
        .then((response) => {
          navigate(`/viewWarehouse/${data.warehouse.id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (id) {
      createLocation(data).then((response) => {
        navigate(`/viewWarehouse/${id}`);
      });
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "maxCapacity") {
      setData((prevData) => ({
        ...prevData,
        available: value,
      }));
    }
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div style={{ minHeight: "80vh" }}>
      <div
        className="text-white shadow-lg mb-5 mt-5 d-flex flex-column col-lg-3 col-md-6 m-auto bg-dark p-4 border rounded-3"
        style={{ width: "35%" }}
      >
        <div
          style={{
            height: "500px",
            width: "90%",
            maxWidth: "600px",
            margin: "0 auto",
          }}
          className="d-flex flex-column justify-content-center "
        >
          <div
            style={{ marginTop: "-80px" }}
            className="d-flex flex-column  align-items-center"
          >
            {location && <h5 className="text-white mb-5"> Update Location</h5>}
            {!location && <h5 className="text-white mb-5"> Add Location</h5>}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row d-flex flex-row align-items-center">
              <label className="col-lg-2 col-md-2">Row:</label>
              <div className="col-lg-10 col-md-10">
                <input
                  type="number"
                  min="0"
                  max={Number.MAX_VALUE}
                  className="form-control "
                  name="row"
                  placeholder="Row"
                  value={data.row}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div
              style={{ marginTop: 10 }}
              className="row d-flex flex-row align-items-center"
            >
              <label className="col-lg-2 col-md-2">Column:</label>
              <div className="col-lg-10 col-md-10">
                <input
                  type="number"
                  min="0"
                  max={Number.MAX_VALUE}
                  className="form-control"
                  name="col"
                  placeholder="Column"
                  value={data.col}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div
              style={{ marginTop: 10 }}
              className="row d-flex flex-row align-items-center"
            >
              <label className="col-lg-2 col-md-2">Max Capacity:</label>
              <div className="col-lg-10 col-md-10">
                <input
                  type="number"
                  min="0"
                  max={Number.MAX_VALUE}
                  className="form-control"
                  name="maxCapacity"
                  placeholder="Max Capacity"
                  value={data.maxCapacity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div
              style={{ maxWidth: "100px" }}
              className="m-auto mt-3 text-center"
            >
              <button
                style={{ marginTop: "20px" }}
                type="submit"
                className="btn btn-primary w-100 mb-2"
              >
                {location != null ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
