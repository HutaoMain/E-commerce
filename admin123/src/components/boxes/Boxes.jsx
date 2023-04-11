import useFetch from "../../contextApi/useFetch";
import "./Boxes.css";

const Boxes = () => {
  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/order/list`
  );

  // const orders = data;
  // const cancelled = orders?.filter((data) => data?.status === "Cancelled");
  // const pending = orders?.filter((data) => data?.status === "Pending");
  // const toClaim = orders?.filter((data) => data?.status === "ToClaim");
  // const completed = orders?.filter((data) => data?.status === "Completed");

  return (
    <div className="widget">
      <h1 className="widget-title">Dashboard</h1>
      <div className="widget-container">
        {/* toClaim */}
        <div className="widgetItem">
          <div className="left">
            <span className="widget-letter">To Claim</span>
            {/* <span className="counter">{toClaim.length}</span> */}
          </div>
          <div className="right">
            <div className="percentage positive">
              {/* <KeyboardArrowUpIcon /> */}
            </div>
          </div>
        </div>

        {/* Service */}
        <div className="widgetItem">
          <div className="left">
            <span className="widget-letter">Completed</span>
            {/* <span className="counter">{completed.length}</span> */}
          </div>
          <div className="right">
            <div className="percentage positive">
              {/* <KeyboardArrowUpIcon /> */}
            </div>
          </div>
        </div>

        {/* Rooms */}
        <div className="widgetItem">
          <div className="left">
            <span className="widget-letter">Pending</span>
            {/* <span className="counter">{pending.length}</span> */}
          </div>
          <div className="right">
            <div className="percentage positive">
              {/* <KeyboardArrowUpIcon /> */}
            </div>
          </div>
        </div>

        {/* Rooms */}
        <div className="widgetItem">
          <div className="left">
            <span className="widget-letter">Cancelled</span>
            {/* <span className="counter">{cancelled.length}</span> */}
          </div>
          <div className="right">
            <div className="percentage positive">
              {/* <KeyboardArrowUpIcon /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boxes;
