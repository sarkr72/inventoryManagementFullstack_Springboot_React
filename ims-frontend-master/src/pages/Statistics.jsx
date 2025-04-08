import React, { useEffect, useState } from 'react'
import Graph from '../components/Graph';
import { listGraphsByCompany } from '../services/GraphService';

const Statistics = () => {
  const [money, setMoney] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [received, setReceived] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await listGraphsByCompany(localStorage.getItem("companyName"));
      const data = response?.data;

      if (data && Array.isArray(data)) {
        const purchasedData = data.filter(graph => graph?.pl === "").map(item => ({
            quantity: item?.quantity,
            date: item?.date
          }));
        setPurchased(purchasedData);
  
        const moneyData = data.filter(graph => graph?.pl === "").map(item => ({
            quantity: item?.price,
            date: item?.date
          }));
        setMoney(moneyData);

        const receivedData = data.filter(graph => graph?.po === "").map(item => ({
            quantity: item?.quantity,
            date: item?.date
          }));
        setReceived(receivedData);
      }
    };

    fetchData();
  }, []);

  const companyName = localStorage.getItem("companyName") || "Default Company";

  return (
    <>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h3 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', color: '#333', fontWeight: 'bold' }}>
          Statistics of {companyName}
        </h3>
      </div>
      <Graph data={{ received }} message={"Product Receivings"} />
      <Graph data={{ purchased }} message={"Product Purchasings"} />
      <Graph data={{ money }} message={"Purchase Orders Costs"} />
    </>
  );
};

export default Statistics;