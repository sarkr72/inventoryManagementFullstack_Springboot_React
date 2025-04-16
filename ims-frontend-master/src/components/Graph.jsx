import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph = (props) => {
  const [chartData, setChartData] = useState(null); 
  const [timeFrame, setTimeFrame] = useState("daily"); 

  const [data, setData] = useState([]);
 
  useEffect(() => {
    const receivedData = Array.isArray(props?.data?.received) ? props?.data?.received : Array.isArray(props?.data?.purchased) ? props?.data?.purchased : Array.isArray(props?.data?.money) ? props?.data?.money : [];
    setData(receivedData);
    const processedData = processChartData(data, timeFrame);
    setChartData(processedData);
  }, [timeFrame, props]);

  const processChartData = (data, timeFrame) => {
    const groupedData = {};
    data?.map((item) => {
      const date = new Date(item?.date);
      let key;

      if(item?.date?.length > 1){
        switch (timeFrame) {
          case "daily":
            key = date.toISOString().split("T")[0]; 
            break;
          case "monthly":
            key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
            break;
          case "yearly":
            key = date.getFullYear().toString(); 
            break;
          default:
            key = date.toISOString().split("T")[0];
        }
  
        groupedData[key] = (groupedData[key] || 0) + item?.quantity;
      }
      
    });

    const labels = Object.keys(groupedData).sort();
    const quantities = labels.map((label) => groupedData[label]);

    return {
      labels,
      datasets: [
        {
          label: `Products ${props?.data?.received ? "Received": props?.data?.purchased ? "Purchased" : props?.data?.money ? "Costs": ""} (${timeFrame})`,
          data: quantities,
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    };
  };

  return (
    <div className="container mt-4 rounded-3 shadow border" style={{backgroundColor: "#F0F0F0", maxWidth: "50%"}}>
      <p className="text-center " style={{fontSize: 23, fontWeight: 640, marginBottom: "-15px"}}>{props?.message}</p>
      <div className="d-flex justify-content-center my-3">
        <button className="btn btn-primary mx-2" onClick={() => setTimeFrame("daily")}>
          Daily
        </button>
        <button className="btn btn-secondary mx-2" onClick={() => setTimeFrame("monthly")}>
          Monthly
        </button>
        <button className="btn btn-success mx-2" onClick={() => setTimeFrame("yearly")}>
          Yearly
        </button>
      </div>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                  font: {weight: "bold"},
                  color: "black",
                  font: {size: 16}
                },
                ticks:{color: "black"},
              },
              y: {
                title: {
                  display: true,
                  text: props?.data?.money ? "Cost" : "Quantity" ,
                  color: "black",
                  font: {size: 16}
                },
                ticks:{color: "black"},
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p className="text-center">Loading chart data...</p>
      )}
    </div>
  );
};

export default Graph;