import "./Users.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import useFetch from "../../contextApi/useFetch";
import SidePanel from "../../components/sidepanel/SidePanel";
import TopBar from "../../components/topBar/TopBar";

const Users = () => {
  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/user/list`
  );

  const rowData = data.filter((item) => item.email !== "admin@gmail.com");

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
      field: "name",
      headerName: "Fullname",
      headerAlign: "center",
      align: "center",
      width: 300,
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
