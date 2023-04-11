import Login from "./page/login/Login";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./page/home/Home";
import Cart from "./page/cart/Cart";
import Navbar from "./components/navbar/Navbar";
import { AuthContext } from "./contextAPI/AuthContext";
import { useContext, useEffect, useState } from "react";
import Profile from "./page/profile/Profile";
import MyPurchase from "./page/profile/MyPurchase";
import ErrorPage from "./page/errorPage/ErrorPage";
import "react-toastify/dist/ReactToastify.css";
import ProductMapping from "./components/product/ProductMapping";

import { useLocation } from "react-router-dom";
import WishlistMapping from "./components/wishlist/WishlistMapping";

function App() {
  const { user, dispatch } = useContext(AuthContext);

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  useEffect(() => {
    if (email) {
      dispatch({ type: "LOGIN_SUCCESS", payload: email });
    }

    console.log(email);
  }, []);

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === "/login" ? null : <Navbar user={user} />}
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category/:id" element={<ProductMapping />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/orders" element={<MyPurchase />} />
        <Route path="/wishlist/:email" element={<WishlistMapping />} />
        {/* <Route path="/topay" element={<ToPay />} /> */}
      </Routes>
    </div>
  );
}

export default App;
