import { useEffect, useState } from "react";
import useFetch from "../../contextApi/useFetch";
import "./Boxes.css";
import axios from "axios";

const Boxes = () => {
  const [listSales, setListSales] = useState([]);

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/order/list`
  );

  const orders = data;
  const cancelled = orders?.filter((data) => data?.status === "Cancelled");
  const pending = orders?.filter((data) => data?.status === "Pending");
  // const toClaim = orders?.filter((data) => data?.status === "ToClaim");
  const completed = orders?.filter((data) => data?.status === "Completed");

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/order/list-sales`
      );
      setListSales(res.data);
    };
    fetch();
  }, []);

  const total = listSales?.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="widget">
      <h1 className="widget-title">Dashboard</h1>
      <div className="widget-container">
        {/* toClaim */}
        {/* <div className="widgetItem">
          <div className="left">
            <span className="widget-letter">To Claim</span>
            <span className="counter">{toClaim.length}</span>
          </div>
          <div className="right">
            <div className="percentage positive"></div>
          </div>
        </div> */}

        {/* Service */}
        <div className="widgetItem">
          <div className="left">
            <span className="widget-letter">Completed</span>
            <span className="counter">{completed.length}</span>
          </div>
          <div className="right">
            <div className="percentage positive"></div>
          </div>
        </div>

        {/* Rooms */}
        <div className="widgetItem">
          <div className="left">
            <span className="widget-letter">Pending</span>
            <span className="counter">{pending.length}</span>
          </div>
          <div className="right">
            <div className="percentage positive"></div>
          </div>
        </div>

        {/* Rooms */}
        <div className="widgetItem">
          <div className="left">
            <span className="widget-letter">Cancelled</span>
            <span className="counter">{cancelled.length}</span>
          </div>
          <div className="right">
            <div className="percentage positive"></div>
          </div>
        </div>

        {/* total sales */}
        <div className="widgetItem">
          <div className="left">
            <span className="widget-letter">Total Sales</span>
            <span className="counter">{total}</span>
          </div>
          <div className="right">
            <div className="percentage positive"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boxes;
