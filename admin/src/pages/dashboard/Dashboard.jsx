import "./Dashboard.css";
import SidePanel from "../../components/sidepanel/SidePanel";
import Boxes from "../../components/boxes/Boxes";
import TopBar from "../../components/topBar/TopBar";
import BarChart from "../../components/charts/BarChart";
import PieChart from "../../components/charts/PieChart";

const Dashboard = () => {
  // const total = data.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="dashboard">
      <SidePanel />
      <div className="dashboard-container">
        <TopBar />
        <Boxes />
        {/* <span>₱ {total}</span> */}
        <BarChart />
        <PieChart />
      </div>
    </div>
  );
};

export default Dashboard;
