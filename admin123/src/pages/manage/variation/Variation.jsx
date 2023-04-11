import "./Variation.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import useFetch from "../../../contextApi/useFetch";
import SidePanel from "../../../components/sidepanel/SidePanel";
import TopBar from "../../../components/topBar/TopBar";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Confirmation from "../../../components/confirmationDialog/Confirmation";
import { Tooltip } from "@mui/material";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "450px",
    height: "250px",
    overflow: "hidden",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root");

const Variation = () => {
  const [list, setList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [paramsId, setParamsId] = useState("");

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/productVariations/list`
  );

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/productVariations/delete/${id}`
      );
      setList(list.filter((item) => item.id !== id));
      window.location.reload();
    } catch (err) {}
  };

  const toggleModalCategory = (id) => {
    setParamsId(id);
    setIsOpenModal(!isOpenModal);
  };

  const productVariationColumn = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "variationName",
      headerName: "Variation Name",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.row.description}>
          <span>{params.row.description}</span>
        </Tooltip>
      ),
    },
    {
      field: "productId",
      headerName: "Product ID",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div
            className={
              (params.row.quantity <= 50 && "lowQuantity") ||
              (params.row.quantity <= 99 && "mediumQuantity") ||
              (params.row.quantity > 100 && "highQuantity")
            }
          >
            {params.row.quantity}
          </div>
        );
      },
    },
    {
      field: "imgUrl",
      headerName: "Image",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <img
              src={params.row.imgUrl}
              alt="variation"
              className="variationImage"
            />
          </>
        );
      },
    },
    {
      field: "actionButton",
      headerName: "Action Button",
      headerAlign: "center",
      align: "center",
      width: 230,
      renderCell: (params) => {
        return (
          <div>
            <Link to={`${params.row.id}`}>
              <button className="actionButton">Update</button>
            </Link>
            <button
              className="actionButton"
              style={{ backgroundColor: "red" }}
              onClick={() => toggleModalCategory(params.row.id)}
            >
              Delete
            </button>
            <Modal
              isOpen={isOpenModal}
              onRequestClose={toggleModalCategory}
              contentLabel="My dialog"
              style={customStyles}
            >
              <Confirmation
                action="delete"
                whatItem="variation"
                btnConfirm={() => handleDelete(paramsId)}
                closeModal={toggleModalCategory}
              />
            </Modal>
          </div>
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
        <h1 style={{ marginLeft: "20px" }}>Product Variations</h1>
        <p style={{ marginLeft: "20px", marginBottom: "10px" }}>
          List of Product Variation
        </p>
        <Link to="addVariation">
          <button className="variationAddBtn">
            <MdAddCircle /> Add Product Variations
          </button>
        </Link>
        <DataGrid
          style={{ overflowX: "scroll", height: "700px" }}
          rows={data}
          columns={productVariationColumn}
          components={{ Toolbar: CustomToolbar }}
        />
      </div>
    </div>
  );
};

export default Variation;
