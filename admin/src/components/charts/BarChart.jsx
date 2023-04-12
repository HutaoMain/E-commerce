import React from "react";
import useFetch from "../../contextApi/useFetch";
import {
  Chart as ChartJs,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";

const BarChart = () => {
  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/order/listByPrice`
  );

  const [chart, setChart] = useState([]);
  ChartJs.register(CategoryScale, LinearScale, BarElement);

  useEffect(() => {
    setChart(data);
  }, [data]);

  const graph = {
    labels: chart?.map((item) => item.date_now),
    datasets: [
      {
        label: "Total Earned",
        data: chart?.map((item) => item.totalPrice),
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "#ecf0f1",
          "#50Af95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
    options: {
      maintainAspectRatio: false,
    },
  };
  return (
    <div className="barChart" style={{ height: "500px" }}>
      <Bar data={graph} />
      <p style={{ color: "gray", textAlign: "center", marginTop: "10px" }}>
        Y-Axis: Total Earned that Day &nbsp; &nbsp; X-Axis: Date Format:
        "yyyy-MM-dd"
      </p>
    </div>
  );
};

export default BarChart;
