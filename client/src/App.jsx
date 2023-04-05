import Login from "./page/login/Login";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/home/Home";
// import ProductSinglePage from "./page/productSinglePage/ProductSinglePage";
import Cart from "./page/cart/Cart";
import Navbar from "./components/navbar/Navbar";
import { AuthContext } from "./contextAPI/AuthContext";
import { useContext } from "react";
import Profile from "./page/profile/Profile";
import MyPurchase from "./page/profile/MyPurchase";
// import Product from "./page/products/Product";
import ToPay from "./page/topay/ToPay";
import ErrorPage from "./page/errorPage/ErrorPage";
import "react-toastify/dist/ReactToastify.css";
import ProductMapping from "./components/product/ProductMapping";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      {user ? <Navbar user={user} /> : <></>}
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        {/* <Route
          path="/category/product/:id"
          element={user ? <ProductSinglePage /> : <Login />}
        /> */}
        <Route
          path="/category/:id"
          element={user ? <ProductMapping /> : <Login />}
        />
        <Route path="/cart" element={user ? <Cart /> : <Login />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
        <Route
          path="/profile/orders"
          element={user ? <MyPurchase /> : <Login />}
        />
        <Route path="/topay" element={user ? <ToPay /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
