/* eslint no-eval: 0 */
// import axios from "axios";
import { useEffect, useState } from "react";
import "./OrderItem.css";
// import { MdOutlineUpload } from "react-icons/md";
// import { UrlPath } from "../../UrlPath";
// import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import SubmitOrImage from "./SubmitOrImage";

const customStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "40%",
    overflow: "hidden",
  },
};

Modal.setAppElement("#root");

const OrderItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [arrayOfObjects, setArrayOfObjects] = useState([]);

  useEffect(() => {
    setArrayOfObjects(eval(item.orderJsonList));
  }, [item.orderJsonList]);

  const toggleOrPayment = () => {
    setOpen(!open);
  };
  return (
    <div className="orderItem">
      <h1 style={{ float: "left", fontWeight: "500" }}>Order ID: {item.id}</h1>
      <h1 className="orderStatus">{item.status}</h1>
      <div className="orderHorizontalLine"></div>
      {arrayOfObjects?.map((arrayItem) => {
        return (
          <>
            <div className="orderContainer">
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
          </>
        );
      })}
      <div>
        <h1 className="orderTotalPrice">
          <i>Order Total:</i> ₱ {item.totalPrice}
        </h1>
      </div>
      {item.status === "Pending" && (
        <div className="orderSubmitProofContainer">
          {/* <img
            src={ImageFile && URL.createObjectURL(ImageFile[0])}
            alt="OR Proof Payment"
            className="orProof"
          /> */}
          {/* <label htmlFor="file-upload" className="orderInputImageLabel">
            <MdOutlineUpload />{" "}
            {ImageFile
              ? URL.createObjectURL(ImageFile)
              : "Upload your image here"}
                </label> */}
          {/* <input
            type="file"
            id="file-upload"
            // onChange={(e) => setImageFile(e.target.files[0])}
            onClick={toggleOrPayment}
            style={{ display: "none" }}
          /> */}

          <div style={{ marginTop: "5px" }}>
            <button
              className="orderItemSubmitBtn"
              // onClick={handlePutImageInOrder}
              onClick={toggleOrPayment}
            >
              Upload Proof of Payment
            </button>
            <span style={{ marginLeft: "10px" }}>
              Alternative payment click here: {"   "}
              <a
                href="https://www.sti.edu/paymentsoptions2/sti_payments.aspx?sch_code=085"
                target="_blank"
                rel="noreferrer"
              >
                STI Website
              </a>
            </span>
            {/* You can also pay here{" "} */}
          </div>
        </div>
      )}
      {/* <ToastContainer /> */}
      <Modal
        isOpen={open}
        onRequestClose={toggleOrPayment}
        contentLabel="My dialog"
        style={customStyle}
        close
      >
        {/* <span style={{ display: "none" }}>{item.id}</span> */}
        <SubmitOrImage item={item} close={toggleOrPayment} />
      </Modal>
    </div>
  );
};

export default OrderItem;
