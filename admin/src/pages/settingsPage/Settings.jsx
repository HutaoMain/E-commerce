import "./Settings.css";
import SidePanel from "../../components/sidepanel/SidePanel";
import useFetch from "../../contextApi/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const [courierInfo, setCourierInfo] = useState({
    courierName: "",
    courierWebsite: "",
  });
  const [courierList, setCourierList] = useState([]);

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/courier/list`
  );

  const handleAddCourier = async () => {
    await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/courier/create`,
      courierInfo
    );
    toast("Successfully add Courier!", {
      type: "success",
      position: "top-center",
      autoClose: 2000,
    });
    setCourierInfo({
      courierName: "",
      courierWebsite: "",
    });
    setTimeout(() => window.location.reload(), 2000);
  };

  useEffect(() => {
    setCourierList(data);
  }, [data]);

  return (
    <div className="settings">
      <SidePanel />
      <div className="settings-container">
        <h1>Add your Courier here</h1>
        <select className="courier-list">
          {courierList?.map((item) => {
            return (
              <option value={item.courierName} key={item.id}>
                {item.courierName}
              </option>
            );
          })}
        </select>

        <section className="add-courier-container">
          <input
            className="add-courier-input"
            type="text"
            placeholder="Courier Name"
            onChange={(e) => {
              setCourierInfo((data) => ({
                ...data,
                courierName: e.target.value,
              }));
            }}
          />
          <input
            className="add-courier-input"
            placeholder="Courier Website"
            type="text"
            onChange={(e) => {
              setCourierInfo((data) => ({
                ...data,
                courierWebsite: e.target.value,
              }));
            }}
          />
          <button className="add-courier-submit-btn" onClick={handleAddCourier}>
            Add Courier
          </button>
        </section>
      </div>
    </div>
  );
};

export default Settings;
