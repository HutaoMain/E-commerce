import React, { useContext } from "react";
import ProfileSide from "../../components/profileSidebar/ProfileSide";
import { AuthContext } from "../../contextAPI/AuthContext";
import "./Profile.css";
import DatePicker from "react-datepicker";
import Footer from "../../components/footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCamera, AiOutlineSave } from "react-icons/ai";
import useFetch from "../../contextAPI/useFetch";
import Modal from "react-modal";
import ChangePassword from "./ChangePassword";
import moment from "moment";

const customStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "20%",
    overflow: "hidden",
  },
};

Modal.setAppElement("#root");

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setprofileData] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [birthday, setBirthday] = useState(null);
  // const [gender, setGender] = useState("");

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const { user } = useContext(AuthContext);

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/user/${user}`
  );

  useEffect(() => {
    setprofileData(data);

    const date = new Date(data?.birthday);
    setBirthday(date.setDate(date.getDate()));
    // setGender(data?.gender);
    // setPassword( data.password);
  }, [data]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/user/update/${profileData.id}`,
        {
          ...profileData,
          birthday: birthday,
          // gender: gender,
        }
      );
      window.location.reload();
      console.log("success");
    } catch (error) {}
  };

  const handlePutImage = async () => {
    const data = new FormData();
    data.append("file", imageSelected);
    data.append("upload_preset", "upload");
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/alialcantara/image/upload",
      data
    );

    const { url } = uploadRes.data;
    await axios.put(
      `${import.meta.env.VITE_APP_API_URL}/api/user/update/image/${
        profileData.id
      }`,
      {
        imageUrl: url,
      }
    );
    window.location.reload();
    console.log("success");
  };

  const fileTypeChecking = (e) => {
    var fileInput = document.getElementById("fileImage");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
    // |\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    }

    setImageSelected(e.target.files[0]);
  };

  return (
    <>
      <div className="profile">
        <ProfileSide />
        <div className="profileManageContainer">
          <div className="profileInfoIntro">
            <h2>My Profile</h2>
            <p>Manage and protect your account</p>
            <div className="profileHorizontalLine"></div>
          </div>
          <div className="profileManageContainerAll">
            <div className="profileManageContainerLeft">
              <img
                src={
                  imageSelected
                    ? URL.createObjectURL(imageSelected)
                    : profileData.imageUrl
                }
                alt="profilePic"
                className="profileImage"
              />
              <label htmlFor="fileImage" className="profileInputLabel">
                <input
                  type="file"
                  accept="image/*"
                  id="fileImage"
                  className="profileInputTypeFile"
                  onChange={fileTypeChecking}
                />
                <AiOutlineCamera /> Choose a file
              </label>
              <button className="profileSaveImageBtn" onClick={handlePutImage}>
                <AiOutlineSave /> Save Image
              </button>
            </div>
            <div className="profileVerticalLine"></div>
            <div className="profileManageContainerRight">
              <div className="profileManageInfo">
                {/* <label>Student No: </label>
                <input
                  className="profileManageInfoList"
                  type="text"
                  defaultValue={profileData.studentNo}
                  onChange={(e) => {
                    setprofileData((data) => ({
                      ...data,
                      studentNo: e.target.value,
                    }));
                  }}
                /> */}

                <label>
                  Firstname: <br />
                </label>
                <span
                  className="profileManageInfoList"
                  style={{ border: "1px solid black" }}
                >
                  {data.firstName}
                </span>

                <label>
                  Lastname: <br />
                </label>
                <span
                  className="profileManageInfoList"
                  style={{ border: "1px solid black" }}
                >
                  {data.lastName}
                </span>

                <label>Student No.: </label>
                <span
                  className="profileManageInfoList"
                  style={{ border: "1px solid black" }}
                >
                  {data.username}
                </span>
                <label>Email: </label>
                <span
                  className="profileManageInfoList"
                  style={{ border: "1px solid black" }}
                >
                  {data.email}
                </span>
                {/* <label>Change Password: </label> */}
                {/* <input
                  className="profileManageInfoList"
                  type="password"
                  onChange={(e) => {
                    setprofileData((data) => ({
                      ...data,
                      password: e.target.value,
                    }));
                  }}
                /> */}
                <button
                  className="profileManageInfoList"
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "10px",
                    marginTop: "10px",
                    cursor: "pointer",
                    backgroundColor: "#0071c2",
                    color: "white",
                  }}
                  onClick={toggleModal}
                >
                  Change Password
                </button>

                {/* <label>Gender: </label>
                <select
                  className="profileManageInfoList"
                  onChange={(e) => {
                    setGender((data) => ({
                      ...data,
                      gender: e.target.value,
                    }));
                  }}
                >
                  <option value="Male" selected={gender === "Male"}>
                    Male
                  </option>
                  <option value="Female" selected={gender === "Female"}>
                    Female
                  </option>
                </select> */}
                <label>Birthday: </label>
                <DatePicker
                  className="profileManageInfoList"
                  selected={birthday}
                  dateFormat="yyyy-MM-dd"
                  maxDate={moment().subtract(15, "years")._d}
                  onChange={(date) => setBirthday(date)}
                />
                <button className="saveProfileInfo" onClick={handleUpdate}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr />
        <Footer />
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyle}
      >
        <ChangePassword userId={data?.id} />
      </Modal>
    </>
  );
};

export default Profile;
