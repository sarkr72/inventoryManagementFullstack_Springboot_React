import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCompany, listCompanies } from "../services/CompanyService";
import { ToastContainer, toast } from "react-toastify";
import '../css/plpage.css'

const ManageCompanies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = () => {
    listCompanies().then((response) => {
      setCompanies(response?.data);
    });
  };
  const handleClick = (company) => {
    // navigate(`/productInventory/${product}`);
    navigate("/company", { state: { company } });
  };
  const addcompany = () => {
    navigate("/addCompany");
  };

  const handleUpdate = (updateCompany) => {
    navigate(
      `/addCompany/${encodeURIComponent(JSON.stringify(updateCompany))}`
    );
  };

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteCompany(item?.id).then((response) => {
        getCompanies();
        toast.success(response.data);
      })
    }
  };


  return (
    <div style={{ minHeight: "80vh" }} className="container mt-2">
      <ToastContainer />
      <h2 >Company Lists</h2>
      <div className="m-5">
        <table className="table table-hover table-bordered table-collapse">
          <thead>
            <tr key={"header"}>
              <th>#</th>
              <th>Compane Name</th>
              <th>Compane Address</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies?.map((item) => (
              <tr key={item?.id}>
                {/* {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))} */}
                {item?.id !== 1 && (
                  <>
                    <td>{item?.id}</td>
                    <td onClick={() => handleClick(item)}>{item?.name}</td>
                    <td>{item?.address}</td>
                    <td>{item?.contact}</td>
                    <td className="d-flex flex-row">
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => handleUpdate(item)}
                        className="btn bg-primary hover-over shadow border-0 text-white "
                      >
                        Edit
                      </button>
                      <button
                        style={{ marginLeft: "10px" }}
                        className="btn bg-danger border-0 hover-over shadow text-white"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}

              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ float: "right" }}>
          {" "}
          <button className="bg-secondary text-white mt-3" onClick={addcompany}>
            Add company
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageCompanies;
