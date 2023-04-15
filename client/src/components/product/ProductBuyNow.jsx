import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../contextAPI/useFetch";
import { AuthContext } from "../../contextAPI/AuthContext";
import axios from "axios";
import { UrlPath } from "../../UrlPath";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartRedux";

const ProductBuyNow = ({ product, setIsOpen, quantity }) => {
  const { user } = useContext(AuthContext);

  const { data } = useFetch(`${UrlPath}/api/user/${user}`);

  console.log(product);

  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.cart);

  //   const arrayProducts = JSON.stringify(products);

  //   console.log("array products", arrayProducts);

  const handlePlaceOrder = async () => {
    dispatch(
      addProduct({
        id: product.id,
        productName: product.name,
        productDes: product.description,
        productPrice: product.price,
        imgUrl: product.imageUrl,
        quantity,
        price: product.price * quantity,
      })
    );

    // Wait for the store to update before accessing the updated products data
    await new Promise((resolve) => setTimeout(resolve, 0));

    const updatedProducts = products;

    const arrayProducts = JSON.stringify(updatedProducts);

    const orderData = {
      products: updatedProducts.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
      totalPrice: product.price,
      userId: data.id,
      email: data.email,
      userFullName: data.name,
      orderJsonList: arrayProducts,
    };
    try {
      await axios.post(`${UrlPath}/api/order/create`, orderData);
      window.localStorage.removeItem("persist:root");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleAddToCart = () => {
  //     dispatch(
  //       addProduct({
  //         id: product.id,
  //         productName: product.name,
  //         productDes: product.description,
  //         productPrice: product.price,
  //         imgUrl: product.imageUrl,
  //         quantity: product.quantity,
  //         price: product.price,
  //       })
  //     );
  //   };

  //   //   const productJson = {
  //   //     id: product.id,
  //   //     productName: product.name,
  //   //     productPrice: product.price,
  //   //     imgUrl: product.imageUrl,
  //   //     quantity: product.quantity,
  //   //     price: product.price,
  //   //   };

  //   //   const arrayProducts = JSON.stringify(productJson);

  //   //   const handlePlaceOrder = async () => {
  //   //     try {
  //   //       const orderData = {
  //   //         email: data.email,
  //   //         totalPrice: product.price,
  //   //         userId: data.id,
  //   //         userFullName: data.name,
  //   //         orderJsonList: arrayProducts,
  //   //       };
  //   //       await axios.post(`${UrlPath}/api/order/create`, orderData);
  //   //       navigate("/");
  //   //       window.location.reload();
  //   //     } catch (error) {
  //   //       console.log(error);
  //   //     }
  //   //   };

  //   const { products } = useSelector((state) => state.cart);

  //   const arrayProducts = JSON.stringify(products);

  //   console.log("array products", arrayProducts);

  //   const handlePlaceOrder = async () => {
  //     handleAddToCart();

  //     const orderData = {
  //       products: products.map((product) => ({
  //         productId: product.id,
  //         quantity: product.quantity,
  //       })),
  //       totalPrice: product.price,
  //       userId: data.id,
  //       email: data.email,
  //       userFullName: data.name,
  //       orderJsonList: arrayProducts,
  //     };
  //     try {
  //       await axios.post(`${UrlPath}/api/order/create`, orderData);
  //       window.localStorage.removeItem("persist:root");
  //       navigate("/");
  //       //   window.location.reload();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <div className="orderConfirmationModal">
      <span className="orderConfirmPrice">PHP {product.price}</span>
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

export default ProductBuyNow;
