import "./OrderConfirmationModal.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contextAPI/AuthContext";
import useFetch from "../../../contextAPI/useFetch";
import { useContext } from "react";

const OrderConfirmationModal = ({ carttotal, setIsOpen }) => {
  const { products } = useSelector((state) => state.cart);

  const { user } = useContext(AuthContext);

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/user/${user}`
  );

  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  const arrayProducts = JSON.stringify(products);

  console.log("array products", arrayProducts);

  const handlePlaceOrder = async () => {
    const orderData = {
      products: products.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
      totalPrice: carttotal,
      userId: data.id,
      email: data.email,
      userFullName: data.name,
      orderJsonList: arrayProducts,
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/order/create`,
        orderData
      );
      window.localStorage.removeItem("persist:root");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="orderConfirmationModal">
      <span className="orderConfirmPrice">PHP {carttotal}</span>
      <span>Includes taxes and fees</span>
      <div className="orderConfirmBtns">
        <button className="orderProceedBtn" onClick={handlePlaceOrder}>
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

// const handlePostOrder = async () => {
//   try {
//     const postOrder = {
//       totalPrice: carttotal,
//       userId: data.id,
//       email: data.email,
//       userFullName: data.name,
//       orderJsonList: arrayProducts,
//       createdDateInMonth: day,
//     };
//     await axios.post(
//       `${import.meta.env.VITE_APP_API_URL}/api/order/create`,
//       postOrder
//     );

//     for (let product of products) {
//       const res = await axios.get(
//         `${import.meta.env.VITE_APP_API_URL}/api/product/list/${product.id}`
//       );

//       console.log(res);

//       await axios.put(
//         `${import.meta.env.VITE_APP_API_URL}/api/product/update/${
//           product.id
//         }`,
//         {
//           productId: product.id,
//           quantity: res.data?.quantity - product.quantity,
//         }
//       );
//     }
//     window.localStorage.removeItem("persist:root");
//     navigate("/");
//     window.location.reload();
//   } catch (error) {}
// };
