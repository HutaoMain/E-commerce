// import "./Sidebar.css";
// import { AiOutlineDashboard, AiOutlineFileSearch } from "react-icons/ai";
// import { MdOutlinePayments, MdProductionQuantityLimits } from "react-icons/md";
// // import { FaBars } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
// import logo from "../../assets/images/sti.png";

// const Sidebar = ({ children }) => {
//   // const [isOpen, setIsOpen] = useState(true);
//   // const toggle = () => setIsOpen(!isOpen);
//   const menuItem = [
//     {
//       path: "/",
//       name: "Dashboard",
//       icon: <AiOutlineDashboard />,
//       exact: true,
//     },
//     {
//       path: "/orders",
//       name: "Orders",
//       icon: <AiOutlineFileSearch />,
//     },
//     {
//       path: "/payment",
//       name: "Payment",
//       icon: <MdOutlinePayments />,
//     },
//     {
//       path: "/products",
//       name: "Products",
//       icon: <MdProductionQuantityLimits />,
//     },
//   ];

//   // style={{ width: isOpen ? "250px" : "50px" }} sidebar
//   // style={{ display: isOpen ? "block" : "none" }} logo
//   // style={{ marginLeft: isOpen ? "101px" : "0px" }} bars
//   // style={{ display: isOpen ? "block" : "none" }} link-text

//   return (
//     <div className="container">
//       <div className="sidebar">
//         <div className="top-section">
//           <img src={logo} alt="STI Logo" className="sidebar-logo" />
//           {/* <div className="bars">
//             <FaBars />
//           </div> */}
//           <div className="sidebar-title">
//             <div className="hori-line"></div>
//             <h1>RIMSti</h1>
//             <div className="hori-line"></div>
//           </div>
//         </div>
//         {menuItem.map((item, index) => (
//           <NavLink to={item.path} key={index} className="sidebar-link">
//             <div className="sidebar-icon">{item.icon}</div>
//             <div className="link-text">{item.name}</div>
//           </NavLink>
//         ))}
//         <button className="sidebar-button">Logout</button>
//       </div>
//       <main>{children}</main>
//     </div>
//   );
// };

// export default Sidebar;

import "./SidePanel.css";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  Logout,
  DensitySmall,
  Launch,
  Dashboard,
  AddShoppingCart,
  CreditCard,
  ManageSearch,
  Person,
  Layers,
  Inventory,
  ListAlt,
} from "@mui/icons-material";
import logo from "../../assets/images/logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../contextApi/AuthContext";
// import { Badge } from "@mui/material";

const SidePanel = () => {
  // const [menuCollapse, setMenuCollapse] = useState(false);

  // const { user, dispatch } = useContext(AuthContext);

  // const logout = () => {
  //   dispatch({ type: "LOGOUT" });
  // };

  // const menuIconClick = () => {
  //   setMenuCollapse(!menuCollapse);
  // };

  const [open, setOpen] = useState(true);

  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={open ? "sidebarOpen" : "sidebarClose"}>
      <div className="sidebarTopSection">
        <img src={logo} alt="STI Logo" className="sidebarLogo" />
        {open ? (
          <div className="sidebarTopSectionText">
            <h1>RIMSti</h1>
            <p style={{ wordBreak: "break-all" }}>{user.email}</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="sidebarCloseMenu" onClick={toggleOpen}>
        {open ? (
          <DensitySmall u className="sidebarMenuIcon" />
        ) : (
          <Launch className="sidebarLaunchIcon" />
        )}
      </div>
      <Menu style={{ fontSize: "20px" }} className="sidebarMenu">
        <div className="menuItem">
          <MenuItem
            icon={<Dashboard />}
            routerLink={<Link to="/" />}
            title="Dashboard"
          >
            <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
              Dashboard
            </span>
          </MenuItem>
        </div>
        <MenuItem
          icon={<AddShoppingCart />}
          routerLink={<Link to="/orders" />}
          title="Orders"
        >
          <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
            Orders
          </span>
        </MenuItem>
        <MenuItem
          icon={<CreditCard />}
          routerLink={<Link to="/payment" />}
          title="Payments"
        >
          <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
            Payments
          </span>
        </MenuItem>
        <SubMenu label={open ? "Manage" : ""} icon={<ManageSearch />}>
          <MenuItem
            routerLink={<Link to="/category" />}
            icon={<Layers />}
            title="Category"
          >
            <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
              Category
            </span>
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/products" />}
            icon={<Inventory />}
            title="Products"
          >
            <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
              Products
            </span>
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/variation" />}
            icon={<ListAlt />}
            title="Variation"
          >
            <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
              Variation
            </span>
          </MenuItem>
        </SubMenu>
        <MenuItem
          icon={<Person />}
          routerLink={<Link to="/users" />}
          title="Users"
        >
          <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
            Users
          </span>
        </MenuItem>
        <MenuItem onClick={logout} icon={<Logout />} title="Logout">
          <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
            Logout
          </span>
        </MenuItem>
      </Menu>
    </div>

    // <Sidebar collapsed={menuCollapse}>
    //   <main>
    //     <div className="top-section">
    //       <img src={logo} alt="STI Logo" className="sidebar-logo" />
    //       <div className="sidebar-title">
    //         <div className="hori-line"></div>
    //         <h1>RIMSti</h1>
    //         <div className="hori-line"></div>
    //         <span
    //           style={{
    //             fontSize: "25px",
    //             fontWeight: "bold",
    //             wordBreak: "break-all",
    //           }}
    //         >
    //           {user.email}
    //         </span>
    //       </div>
    //     </div>
    //     <div className="closemenu" onClick={menuIconClick}>
    //       <FaBars className="iconSomething" />
    //     </div>
    //     {/* <Badge badgeContent={1} color={"primary"}>
    //       <MdCircleNotifications className="sidebar-icon" />
    //     </Badge> */}
    //   </main>
    //   <Menu style={{ fontSize: "20px" }}>
    //     <MenuItem icon={<AiOutlineDashboard />} routerLink={<Link to="/" />}>
    //       Dashboard
    //     </MenuItem>
    //     <MenuItem
    //       icon={<AiOutlineFileSearch />}
    //       routerLink={<Link to="/orders" />}
    //     >
    //       Orders
    //     </MenuItem>
    //     <MenuItem
    //       icon={<MdOutlinePayments />}
    //       routerLink={<Link to="/payment" />}
    //     >
    //       Payments
    //     </MenuItem>
    //     <SubMenu label="Manage" icon={<MdManageAccounts />}>
    //       <MenuItem routerLink={<Link to="/category" />}>Category</MenuItem>
    //       <MenuItem routerLink={<Link to="/products" />}>Products</MenuItem>
    //       <MenuItem routerLink={<Link to="/variation" />}>Variation</MenuItem>
    //     </SubMenu>
    //     <MenuItem icon={<AiOutlineUser />} routerLink={<Link to="/users" />}>
    //       Users
    //     </MenuItem>
    //     <MenuItem onClick={logout} icon={<FiLogOut />}>
    //       Logout
    //     </MenuItem>
    //   </Menu>
    // </Sidebar>
  );
};

export default SidePanel;