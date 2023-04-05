import "./OrderConfirmationModal.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contextAPI/AuthContext";
import useFetch from "../../../contextAPI/useFetch";
import { useContext } from "react";

const OrderConfirmationModal = ({ carttotal, setIsOpen }) => {
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.cart);

  const { user } = useContext(AuthContext);

  const { data } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/user/${user.email}`
  );

  console.log(data);

  const closeModal = () => {
    setIsOpen(false);
  };

  const date = new Date();
  const day = date.toLocaleString("en-us", { weekday: "long" });

  // const handlePostOrder = async () => {
  //   try {
  //     for (let product of products) {
  //       const postOrder = {
  //         productName: product?.name,
  //         productId: product?.id,
  //         quantity: product?.quantity,
  //         totalPrice: product?.quantity * product?.price,
  //         userId: data?.id,
  //         userFullName: data.firstName + " " + data.lastName,
  //         imageUrl: product.imgUrl,
  //         productVariation: product?.variationName,
  //         productDesc: product?.description,
  //         createdDateInMonth: day,
  //       };
  //       await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/order/create`, postOrder);

  //       const res = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_URL}/api/productVariations/${product.id}`
  //       );

  //       await axios.put(
  //         `${process.env.REACT_APP_BACKEND_URL}/api/productVariations/update/quantity/${product.id}`,
  //         {
  //           productId: product.id,
  //           quantity: res.data?.quantity - product.quantity,
  //         }
  //       );
  //       window.localStorage.removeItem("persist:root");
  //       navigate("/");
  //       window.location.reload();
  //     }
  //   } catch (error) {}
  // };

  const arrayProducts = JSON.stringify(products);

  const handlePostOrder = async () => {
    try {
      const postOrder = {
        // productName: data.
        // productId: product?.id,
        // quantity: product?.quantity,
        totalPrice: carttotal,
        userId: data.id,
        username: data.username,
        userFullName: data.firstName + " " + data.lastName,
        imageUrl: products?.[0].imgUrl,
        // productVariation: product?.variationName,
        // productDesc: product?.description,
        orderJsonList: arrayProducts,
        createdDateInMonth: day,
      };
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/order/create`,
        postOrder
      );

      for (let product of products) {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/productVariations/${product.id}`
        );

        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/productVariations/update/quantity/${product.id}`,
          {
            productId: product.id,
            quantity: res.data?.quantity - product.quantity,
          }
        );
      }
      window.localStorage.removeItem("persist:root");
      navigate("/");
      window.location.reload();
    } catch (error) {}
  };

  return (
    <div className="orderConfirmationModal">
      <span className="orderConfirmPrice">PHP {carttotal}</span>
      <span>Includes taxes and fees</span>
      <div className="orderConfirmBtns">
        <button className="orderProceedBtn" onClick={handlePostOrder}>
          Proceed
        </button>
        <button className="orderCancelBtn" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
