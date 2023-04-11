import "./Dashboard.css";
import SidePanel from "../../components/sidepanel/SidePanel";
import Boxes from "../../components/boxes/Boxes";
import TopBar from "../../components/topBar/TopBar";
import { Bar } from "react-chartjs-2";
import useFetch from "../../contextApi/useFetch";
import {
  Chart as ChartJs,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { useState } from "react";
import { useEffect } from "react";

const Dashboard = () => {
  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/order/listByPrice`
  );

  const [chart, setChart] = useState([]);

  useEffect(() => {
    setChart(data);
  }, [data]);

  ChartJs.register(CategoryScale, LinearScale, BarElement);

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
    <div className="dashboard">
      <SidePanel />
      <div className="dashboard-container">
        <TopBar />
        <Boxes />
        <div className="barChart" style={{ height: "500px" }}>
          <Bar data={graph} />
          <p style={{ color: "gray", textAlign: "center", marginTop: "10px" }}>
            Y-Axis: Total Earned that Day &nbsp; &nbsp; X-Axis: Date Format:
            "yyyy-MM-dd"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
