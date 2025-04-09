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
  const [file, setFile] = useState(null);
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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
    if (!file) {
      alert("Please select a logo first");
      return;
    }
    
    if (updateCompany) {
        updateCompanyWithId(data?.id, data).then(async(response) => {
          await handleUpload();
          navigate("/manageCompanies");
        });
    } else {
      createCompany(data).then(async(response) => {
          await handleUpload();
          navigate("/manageCompanies");
        }).catch((error) => {
          console.log(error);
        });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a logo first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/files/upload/${companyId}`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
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
      <div>
      <h3>Upload Company Logo:</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
    </div>
  );
};

export default AddCompany;
