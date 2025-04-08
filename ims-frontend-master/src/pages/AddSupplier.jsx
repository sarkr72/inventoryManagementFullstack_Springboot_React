import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddForm from "../components/AddForm";
import {
  createSupplier,
  updateSupplierById,
} from "../services/SupplierService";

const AddSupplier = () => {
  const [data, setData] = useState({
    id: "",
    name: "",
    address: "",
    contact: "",
    companies: [{ id: "" }],
  });
  const { updateSupplier } = useParams();
  const navigate = useNavigate();
  const message = "Supplier";

  useEffect(() => {
    if (updateSupplier) {
      try {
        const decoded = JSON.parse(decodeURIComponent(updateSupplier));
        setData(decoded);
      } catch (error) {
        console.log(error);
      }
    } else {
      setData({
        ...data,
        companies: [{ id: localStorage.getItem("companyId") }],
      });
    }
  }, [updateSupplier]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateSupplier) {
      updateSupplierById(data.id, data).then((response) => {
        navigate("/manageSuppliers");
      });
      
    } else {
      createSupplier(data).then((response) => {
        navigate("/manageSuppliers");
      });
      // updateCompanyWithId(localStorage.getItem("companyId"), JSON.parse(localStorage.getItem("company"))).then((response)=>{
      //   navigate("/manageSuppliers");
      //   console.log("hello");
      // });
    }
  };

  return (
    <div>
      <AddForm
        message={message}
        data={data}
        update={updateSupplier}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
};

export default AddSupplier;
