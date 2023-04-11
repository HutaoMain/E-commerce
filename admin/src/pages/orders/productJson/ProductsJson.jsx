/* eslint no-eval: 0 */
import "./ProductJson.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../../contextApi/useFetch";
import SidePanel from "../../../components/sidepanel/SidePanel";
import TopBar from "../../../components/topBar/TopBar";

const ProductsJson = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [orderJson, setOrderJson] = useState([]);

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/order/list/${id}`
  );

  useEffect(() => {
    setOrderJson(data?.orderJsonList);
  }, [data.orderJsonList]);

  const stringToJson = eval(orderJson);

  console.log(data);

  return (
    <div className="productJson">
      <SidePanel />
      <div className="productJsonContainer">
        <TopBar />
        <h1 style={{ marginLeft: "10px", fontWeight: "500" }}>
          Product Ordered
        </h1>
        <div className="orderItem">
          <h1 style={{ float: "left" }}>Order ID: {data.id}</h1>
          <h1 className="orderStatus">{data.status}</h1>
          <div className="orderHorizontalLine"></div>
          {stringToJson?.map((arrayItem, key) => {
            return (
              <div key={key}>
                <div className="productJsonOrderContainer">
                  <div className="orderProductImageContainer">
                    <img
                      src={arrayItem.imgUrl}
                      alt="productImage"
                      className="orderImg"
                    />
                  </div>
                  <div className="orderDetailsContainer">
                    <h1 className="orderProductName">
                      <i>Product Name:</i> {arrayItem.name}
                    </h1>
                    <span className="orderVariationName">
                      <i>Variation:</i> {arrayItem.variationName}
                    </span>
                    <span className="orderVariationName">
                      <i>Description:</i> {arrayItem.description}
                    </span>
                    <span className="orderQuanitty">
                      <i>Quantity: </i>
                      {arrayItem.quantity}
                    </span>
                  </div>
                  <span className="orderProductPrice">
                    <i>Price:</i> ₱ {arrayItem.price}
                  </span>
                </div>
                <div className="orderHorizontalLineInside"></div>
              </div>
            );
          })}
          <div>
            <h1 className="orderTotalPrice">
              <i>Order Total:</i> ₱ {data.totalPrice}
            </h1>
          </div>
          {/* {item.status === "Pending" && (
          <div className="orderSubmitProofContainer">
            <label htmlFor="file-upload" className="orderInputImageLabel">
              <MdOutlineUpload /> Upload your image here
              <input
                type="file"
                id="file-upload"
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                }}
                style={{ display: "none" }}
              />
            </label>
            <div style={{ marginTop: "5px" }}>
              <button
                className="orderItemSubmitBtn"
                onClick={handlePutImageInOrder}
              >
                Submit Proof of Payment
              </button>

              <span>Physical ,.........</span>

              <span>
                Online ,......... please click here
                <a href="https://www.sti.edu/paymentsoptions2/sti_payments.aspx?sch_code=085">
                  STI Website
                </a>
              </span>
            </div>
          </div>
        )} */}
        </div>
      </div>
    </div>
  );
};

export default ProductsJson;
