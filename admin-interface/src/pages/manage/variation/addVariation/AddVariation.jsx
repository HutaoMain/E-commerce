import "./AddVariation.css";
import { useEffect, useState } from "react";
import SidePanel from "../../../../components/sidepanel/SidePanel";
import TopBar from "../../../../components/topBar/TopBar";
import { MdOutlineUpload, MdOutlineDownloadDone } from "react-icons/md";
import useFetch from "../../../../contextApi/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UrlPath } from "../../../../UrlPath";
import Confirmation from "../../../../components/confirmationDialog/Confirmation";
import Modal from "react-modal";

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

const AddVariation = () => {
  const { data } = useFetch(`${UrlPath}/api/product/list`);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [ImageFile, setImageFile] = useState("");
  const [info, setInfo] = useState({});
  const [selectedProduct, setSelectedProduct] = useState("");

  console.log(selectedProduct);
  console.log(info);

  useEffect(() => {
    setSelectedProduct(data?.[0]?.id);
  }, [data]);

  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", ImageFile);
      data.append("upload_preset", "upload");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/alialcantara/image/upload",
        data
      );
      const { url } = uploadRes.data;

      await axios.post(`${UrlPath}/api/productVariations/create`, {
        ...info,
        imgUrl: url,
        productId: selectedProduct,
      });
      navigate("/variation");
      console.log("success");
    } catch (err) {}
  };

  const toggleModalCategory = (e) => {
    e.preventDefault();
    setIsOpenModal(!isOpenModal);
  };

  const fileTypeChecking = (e) => {
    var fileInput = document.getElementById("file-upload");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
    // |\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    }

    setImageFile(e.target.files[0]);
  };

  return (
    <div className="addCategory">
      <SidePanel />
      <div className="addCategoryContainer">
        <TopBar />
        <div className="addCategoryTitle">
          <h1>Add Product Variation</h1>
        </div>
        <div className="addCatLeftRightContainer">
          <div className="addCategoryLeft">
            <img
              src={
                ImageFile
                  ? URL.createObjectURL(ImageFile)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="AddImage"
            />
          </div>
          <div className="addCategoryRight">
            <form className="addCategoryForm">
              <div className="addCategoryItemImage">
                <label htmlFor="file-upload" className="imageInputLabel">
                  <MdOutlineUpload /> Upload your image here
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={fileTypeChecking}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              <div className="addCategoryItem">
                <input
                  type="text"
                  placeholder="Product Variation Name"
                  className="addCategoryInput"
                  onChange={(e) => {
                    setInfo((data) => ({
                      ...data,
                      variationName: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="addCategoryItem">
                <textarea
                  className="addCategoryInput"
                  placeholder="description"
                  cols="30"
                  rows="10"
                  onChange={(e) => {
                    setInfo((data) => ({
                      ...data,
                      description: e.target.value,
                    }));
                  }}
                ></textarea>
              </div>

              <div className="addVariationNumber">
                <div style={{ marginRight: "5px" }}>
                  <label>
                    Price: <br />
                  </label>
                  <input
                    type="number"
                    className="variationPrice"
                    onChange={(e) => {
                      setInfo((data) => ({
                        ...data,
                        price: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <label>
                    Quantity: <br />
                  </label>
                  <input
                    type="number"
                    className="variationPrice"
                    onChange={(e) => {
                      setInfo((data) => ({
                        ...data,
                        quantity: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="addCategoryItem">
                <label style={{ marginTop: "30px", fontSize: "15px" }}>
                  Products: <br />
                </label>
                <select
                  style={{
                    fontSize: "20px",
                    width: "300px",
                    border: "none",
                    borderBottom: "1px solid black",
                    marginTop: "10px",
                  }}
                  onChange={(e) => {
                    setSelectedProduct(e.target.value);
                  }}
                >
                  {data.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="addCategoryBtn" onClick={toggleModalCategory}>
                <MdOutlineDownloadDone /> Add Product Variation
              </button>
              <Modal
                isOpen={isOpenModal}
                onRequestClose={toggleModalCategory}
                contentLabel="My dialog"
                style={customStyles}
              >
                <Confirmation
                  action="add"
                  whatItem="variation"
                  btnConfirm={handleAddProduct}
                  closeModal={toggleModalCategory}
                />
              </Modal>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVariation;
