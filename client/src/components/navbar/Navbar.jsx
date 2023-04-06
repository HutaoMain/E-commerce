import "./Navbar.css";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
// MdOutlinePayments, AiOutlineDashboard
import {
  MdProductionQuantityLimits,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { FaBars } from "react-icons/fa";
import logo from "../../images/logo.png";
import { AuthContext } from "../../contextAPI/AuthContext";
import { useContext, useState, useEffect } from "react";
import useFetch from "../../contextAPI/useFetch";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";

const Navbar = ({ user }) => {
  const { dispatch } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [toClaim, setToClaim] = useState([]);
  const [open, setOpen] = useState(false);

  const { quantity } = useSelector((state) => state.cart);

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/user/${user?.email}`
  );

  const toggleOpen = () => {
    setOpen(!open);
    console.log(open);
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    setOrders(data.order);
    setToClaim(orders?.filter((data) => data.status === "ToClaim"));
  }, [data.order, orders]);

  console.log("orders", orders);
  console.log("toclaim", toClaim);

  return (
    <div>
      <div className="topLoginDesign1"></div>
      <div className="topLoginDesign2"></div>

      <div className="rimstiNavbar">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <section className="navbar-logo-letter">
            <img src={logo} alt="logo" className="navbarLogo" />
            <span className="navbarLogoLetter">BEAUTY AVENUE</span>
          </section>
        </Link>
        <div className={open ? "rimstiNavContainerOpen" : "rimstiNavContainer"}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            {/* <AiOutlineDashboard className="sidebar-icon" /> */}
            {/* <div className="link-text">Homepage</div> */}
            {/* placeholder */}
            <div className="link-text">HOME</div>
          </Link>
          <Link to="/topay" style={{ textDecoration: "none", color: "black" }}>
            {/* <MdOutlinePayments className="sidebar-icon" /> */}
            {/* <div className="link-text">To Pay</div> */}
            {/* placeholder */}
            <div className="link-text">FACEMASK</div>
          </Link>

          {/* additional links add here */}
          <Link to="/topay" style={{ textDecoration: "none", color: "black" }}>
            {/* <div className="link-text">To Pay</div> */}
            <div className="link-text">SOAP</div>
          </Link>

          <Link to="/topay" style={{ textDecoration: "none", color: "black" }}>
            {/* <div className="link-text">To Pay</div> */}
            <div className="link-text">GLUTATHIONE</div>
          </Link>

          <Link to="/topay" style={{ textDecoration: "none", color: "black" }}>
            {/* <div className="link-text">To Pay</div> */}
            <div className="link-text">SERUM</div>
          </Link>

          {/* addtional links ends here */}

          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            <Badge
              badgeContent={quantity}
              color={open ? "secondary" : "primary"}
            >
              <MdProductionQuantityLimits className="sidebar-icon" />
            </Badge>
          </Link>
          <Link
            to="/profile/orders"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Badge
              badgeContent={toClaim?.length}
              color={open ? "secondary" : "primary"}
            >
              <MdOutlineNotificationsActive className="sidebar-icon" />
            </Badge>
          </Link>

          <div className="profileDropDown">
            <img
              src={data.imageUrl || "https://i.ibb.co/MBtjqXQ/no=avatar.gif"}
              alt="profile"
              className="topAvatarImg"
            />
            <div className="profileMenuContainer">
              <div className="profileMenu">
                <div className="profileMenuTop">
                  <img src={data.imageUrl} alt="" id="circle-avatar" />
                  <h5>{data?.username}</h5>
                  <p>{data.email}</p>
                </div>
                <p
                  style={{
                    color: "#bebebe",
                    fontWeight: "bold",
                    fontSize: 12,
                    marginTop: 10,
                  }}
                >
                  {data?.userRole === "ROLE_USER" ? <span>STUDENT</span> : ""}
                </p>
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <button className="seeProfileBtn">
                    <small>See Profile</small>
                  </button>
                </Link>
                <div className="d-grid">
                  <button className="btnLogout" onClick={logout}>
                    <small>Logout</small>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {open ? (
          <AiOutlineClose className="faBar" onClick={toggleOpen} />
        ) : (
          <FaBars className="faBar" onClick={toggleOpen} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
