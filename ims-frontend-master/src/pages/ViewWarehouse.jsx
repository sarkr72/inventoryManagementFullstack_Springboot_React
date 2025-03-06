import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getWarehouse } from '../services/WarehouseService';
import { deleteLocation } from '../services/LocationService';
import { ToastContainer, toast } from "react-toastify";
import '../css/plpage.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ViewWarehouse = () => {
    const { id } = useParams();
    const [total, setTotal] = useState(0);
    const location = useLocation();
    // const { warehouse } = location.state || {};
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [warehouse, setWarehouse] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const role = sessionStorage.getItem('role');

    useEffect(() => {
        getLocations();
    }, [])

    useEffect(() => {
        if (locations.length > 0) {
            const total = locations.reduce((acc, location) => acc + location.stock, 0);
            setTotal(total);
        }
    }, [locations])

    const getLocations = () => {
        getWarehouse(id).then((response) => {
            setLocations(response.data.locations);
            setWarehouse(response.data.name);
        })
    }

    const handleClick = (locationId) => {
        navigate('/viewLocation', { state: { locationId } });
    }
    const addLocation = () => {
        navigate(`/addLocation`, { state: { id } });
    }

    const handleUpdate = (location) => {
        navigate(`/updateLocation/${encodeURIComponent(JSON.stringify(location))}`);
    }


    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteLocation(id).then((response) => {
                getLocations();
                toast.success("Location deleted successfully!");
            })
        }
    };

    const filteredRowCol = locations.filter((location) =>
        `${location.row}${location.col}`.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div style={{ minHeight: "85vh" }}>
            <Row>
                <h3 className="ml-5" style={{ marginLeft: 40 }}>Warehouse Name: {" "}<span className='fw-bold'>{warehouse}</span></h3>
                <div as={Col} className="container d-flex mb-5" style={{ maxWidth: '600px' }}>
                    <input onChange={(e) => setSearchTerm(e.target.value)} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <button type="button" className="btn btn-primary" data-mdb-ripple-init >search</button>
                </div>
            </Row>
            <ToastContainer />
            <div style={{maxWidth: "80%", margin: "auto"}}>
                <div className='m-auto p-3 rounded-3 border shadow-sm' style={{ maxWidth: '170vh', background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)' }}>
                    <h4 as={Col} style={{ marginBottom: 10 }}>Location Lists</h4>
                    <table style={{ border: '2px solid black' }} className="table table-hover table-bordered " >
                        <thead>
                            <tr >
                                <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">#</th>
                                <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">Row</th>
                                <th style={{ backgroundColor: "#3C3A7D" }} className='text-white' scope="col">Column</th>
                                <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">Max Capacity</th>
                                <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">Available</th>
                                <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">Stock</th>
                                <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRowCol && filteredRowCol.map((location, index) =>
                                    <tr key={index} >
                                        <td style={{ backgroundColor: "#3C3A7D", color: "white" }}>{location?.id}</td>
                                        <td>{location?.row}</td>
                                        <td>{location?.col}</td>
                                        <td>{location?.maxCapacity}</td>
                                        <td>{location?.available}</td>
                                        <td>{location?.stock}</td>
                                        <td style={{maxWidth: "250px"}} className='d-flex flex-row'> <button style={{ marginLeft: "10px", backgroundColor: "#b8f48d" }} onClick={() => handleClick(location.id)} className='btn shadow hover-over border-0 text-black '>Open</button>
                                            {role === "ROLE_MANAGER" && (
                                                <>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => handleUpdate(location)} className='btn bg-primary border-0 shadow hover-over text-white '>Edit</button>
                                                    <button disabled={location?.stock >= 1} onClick={() => handleDelete(location.id)} style={{ marginLeft: "10px" }} className='btn shadow hover-over bg-danger border-0 text-white'>Delete</button>

                                                </>
                                            )}
                                        </td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="d-flex flex-column text-end"
                        style={{ width: "100%", marginTop: 0 }}>
                        <p className="" style={{ backgroundColor: "#6AF86F", fontWeight: "bold" }}  >
                            Total: {total}
                        </p>
                    </div>

                </div>
                {role === "ROLE_MANAGER" && (
                    <>
                        <div className="" style={{ float: "right" }}>
                            <button className="bg-secondary text-white mt-3"
                                onClick={addLocation}
                            >Add Location </button>
                        </div>
                    </>)}
            </div>
        </div>
    )
}

export default ViewWarehouse