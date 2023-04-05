import "./Users.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import useFetch from "../../contextApi/useFetch";
import SidePanel from "../../components/sidepanel/SidePanel";
import TopBar from "../../components/topBar/TopBar";
import { UrlPath } from "../../UrlPath";
// import { Link } from "react-router-dom";
// import { MdAddCircle } from "react-icons/md";
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";

const Users = () => {
  // const [list, setList] = useState([]);
  // const [selectedStatus, setSelectedStatus] = useState("");

  const { data } = useFetch(`${UrlPath}/api/user/list`);

  const rowData = data.filter(
    (item) => item.username !== "admin123" && item.username !== "02000112536"
  );

  // useEffect(() => {
  //   setList(data);
  // }, [data]);

  // const handleUpdateStatus = async (id) => {
  //   try {
  //     await axios.put(`http://localhost:8080/api/order/update/status/${id}`, {
  //       orderStatus: selectedStatus,
  //     });
  //     setList(list.filter((item) => item.id !== id));
  //     window.location.reload();
  //   } catch (err) {}
  // };

  const usersColumn = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "username",
      headerName: "Student No.",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "firstName",
      headerName: "First Name",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "birthday",
      headerName: "Birthday",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "gender",
      headerName: "Gender",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "imgUrl",
      headerName: "Image",
      headerAlign: "center",
      align: "center",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <img
              src={params.row.imageUrl}
              alt="User"
              className="variationImage"
            />
          </>
        );
      },
    },
    // {
    //   field: "actionButton",
    //   headerName: "Action Button",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 230,
    //   renderCell: (params) => {
    //     return (
    //       <div>
    //         <button className="actionButton">Update</button>
    //         <button className="actionButton" style={{ backgroundColor: "red" }}>
    //           Delete
    //         </button>
    //       </div>
    //     );
    //   },
    // },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }

  return (
    <div className="orders">
      <SidePanel />
      <div className="orderContainer">
        <TopBar />
        <h1 style={{ marginLeft: "20px" }}>Users</h1>
        <p style={{ marginLeft: "20px", marginBottom: "10px" }}>
          List of Users
        </p>
        {/* <Link to="/addVariation">
          <button className="variationAddBtn">
            <MdAddCircle /> Add Product Variations
          </button>
        </Link> */}
        <DataGrid
          style={{ overflowX: "scroll", height: "700px" }}
          rows={rowData}
          columns={usersColumn}
          components={{ Toolbar: CustomToolbar }}
        />
      </div>
    </div>
  );
};

export default Users;
