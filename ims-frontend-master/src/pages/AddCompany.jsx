import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCompany, updateCompanyWithId } from "../services/CompanyService";
import AddForm from "../components/AddForm";

const AddCompany = () => {
  const [data, setData] = useState({
    name: "",
    address: "",
    contact: "",
    supplier: "",
  });
  const { updateCompany } = useParams();
  const navigate = useNavigate();
  const message = "Company";

  useEffect(() => {
    if (updateCompany) {
      try {
        const decoded = JSON.parse(decodeURIComponent(updateCompany));
        setData(decoded);
      } catch (error) {
        console.log(error);
      }
    }
  }, [updateCompany]);



  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateCompany) {
        updateCompanyWithId(data?.id, data).then((response) => {
          navigate("/manageCompanies");
        });
    } else {
      createCompany(data).then((response) => {
          navigate("/manageCompanies");
        }).catch((error) => {
          console.log(error);
        });
    }
  };



  return (
    <div>
      <AddForm
        message={message}
        data={data}
        update={updateCompany}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
};

export default AddCompany;
