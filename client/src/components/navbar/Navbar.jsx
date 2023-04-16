import "./Navbar.css";
import { Link } from "react-router-dom";
import {
  MdProductionQuantityLimits,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../images/logo.png";
import { AuthContext } from "../../contextAPI/AuthContext";
import { useContext, useState, useEffect } from "react";
import useFetch from "../../contextAPI/useFetch";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { UrlPath } from "../../UrlPath";

const Navbar = ({ user }) => {
  const { dispatch } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [toClaim, setToClaim] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [profileIsOpen, setProfileIsOpen] = useState(false);

  const { quantity } = useSelector((state) => state.cart);

  const { data } = useFetch(`${UrlPath}/api/user/${user}`);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    setOrders(data.order);
    setToClaim(orders?.filter((data) => data.status === "ToClaim"));
  }, [data.order, orders]);

  return (
    <>
      <div className="first-bar-design"></div>
      <div className="second-bar-design"></div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo-container">
            <img src={logo} alt="logo" className="navbar-logo" />
            <span className="navbar-logo-letter">BEAUTY AVENUE</span>
          </Link>
          <section className="navbar-responsive-profile-burger">
            <div className={isOpen ? "nav-menu open" : "nav-menu"}>
              <Link
                className="nav-item"
                to="/"
                onClick={() => setIsOpen(false)}
              >
                <span>HOME</span>
              </Link>
              <Link
                className="nav-item"
                to="/category/4"
                onClick={() => setIsOpen(false)}
              >
                <span>FACEMASK</span>
              </Link>
              <Link
                className="nav-item"
                to="/category/1"
                onClick={() => setIsOpen(false)}
              >
                <span>SOAP</span>
              </Link>
              <Link
                className="nav-item"
                to="/category/3"
                onClick={() => setIsOpen(false)}
              >
                <span>GLUTATHIONE</span>
              </Link>
              <Link
                className="nav-item"
                to="/category/2"
                onClick={() => setIsOpen(false)}
              >
                <span>SERUM</span>
              </Link>
              <Link
                className="nav-item"
                to="/cart"
                onClick={() => setIsOpen(false)}
              >
                <Badge
                  badgeContent={quantity}
                  color={open ? "secondary" : "primary"}
                >
                  <MdProductionQuantityLimits className="sidebar-icon" />
                </Badge>
              </Link>
              <Link className="nav-item" to="/profile/orders">
                <Badge
                  badgeContent={toClaim?.length}
                  color={open ? "secondary" : "primary"}
                >
                  <MdOutlineNotificationsActive className="sidebar-icon" />
                </Badge>
              </Link>
            </div>
            {user ? (
              <div
                className="profile-dropdown"
                onClick={() => setProfileIsOpen(!profileIsOpen)}
              >
                <img
                  src={
                    data.imageUrl || "https://i.ibb.co/MBtjqXQ/no=avatar.gif"
                  }
                  alt="profile"
                  className="top-avatar"
                />
                {profileIsOpen && (
                  <div className="profile-menu-container">
                    <div className="profile-menu">
                      <div className="profile-menu-top">
                        <img
                          src={
                            data.imageUrl ||
                            "https://i.ibb.co/MBtjqXQ/no=avatar.gif"
                          }
                          alt=""
                          id="circle-avatar"
                        />
                        <p>{data.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        style={{
                          textDecoration: "none",
                          color: "black",
                          width: "100%",
                        }}
                      >
                        <button className="profile-menu-btn">
                          See Profile
                        </button>
                      </Link>
                      <Link
                        to={`/wishlist/${user}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          width: "100%",
                        }}
                      >
                        <button className="profile-menu-btn">Wish list</button>
                      </Link>
                      <div className="logout-container">
                        <button className="btnLogout" onClick={logout}>
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="navbar-login-btn">Login</button>
              </Link>
            )}

            <div className="menu-icon" onClick={toggleNavbar}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
          </section>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
