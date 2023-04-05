import "./Login.css";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../../images/logo.png";
import { FaUserCircle } from "react-icons/fa";
import Modal from "react-modal";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";
import { AuthContext } from "../../contextAPI/AuthContext";
import Registration from "./registration/Registration";
import { UrlPath } from "../../UrlPath";
import ForgotPass from "./forgotPassword/ForgotPass";
import useFetch from "../../contextAPI/useFetch";

const customStylesRegistration = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "65%",
    overflow: "hidden",
  },
};

const customStylesForgotPass = {
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

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForgotPass, setIsOpenForgotPass] = useState(false);

  const { loading, error, dispatch } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { data } = useFetch(`${UrlPath}/api/user/${credentials?.email}`);

  const navigate = useNavigate();

  const handleChangeLogin = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log(data.isEnabled);

  const handleLogin = async () => {
    if (data.isEnabled === true) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(`${UrlPath}/api/auth/login`, credentials);
        if (res.status === 200) {
          dispatch({ type: "LOGIN_SUCCESS", payload: credentials });
          navigate("/", { replace: true });
        } else {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: { message: "You are not allowed!" },
          });
        }
      } catch (err) {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "User not correct!" },
        });
      }
    } else {
      window.alert("NOT ALLOWED");
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleModalForgotPass = () => {
    setIsOpenForgotPass(!isOpenForgotPass);
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      // console.log("User pressed: ", event.key);
      if (event.key === "Enter") {
        handleLogin();
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <div className="login">
      <div className="topLoginDesign1"></div>
      <div className="topLoginDesign2"></div>
      <div className="loginContainer">
        <div className="leftLogin">
          <img src={logo} alt="Logo" className="loginLogo" />
          <h1>Welcome to RIMSti</h1>
          <p>
            Reservation and Inventory Management System of School Merchandise
            for STI College Sta.Maria
          </p>
        </div>
        <div className="rightLogin">
          <div className="loginBox">
            <FaUserCircle className="loginIconUser" />
            <div className="loginInput">
              <label>Username:</label>
              <input type="text" id="email" onChange={handleChangeLogin} />
              <label>Password:</label>
              <input
                type="password"
                id="password"
                onChange={handleChangeLogin}
              />
              <button
                className="loginButton"
                disabled={loading}
                onClick={handleLogin}
              >
                Login
              </button>
              {error && <span>{error.message}</span>}
              <span className="forgotPassClick" onClick={toggleModalForgotPass}>
                Forgot password?
              </span>
              <Modal
                isOpen={isOpenForgotPass}
                onRequestClose={toggleModalForgotPass}
                contentLabel="My dialog"
                style={customStylesForgotPass}
              >
                <ForgotPass />
              </Modal>
              <div className="createNewAccountHori"></div>
              <span>No existing account ? Create New Account Here</span>
              <button className="createNewAccountBtn" onClick={toggleModal}>
                Create Account
              </button>
            </div>

            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="My dialog"
              style={customStylesRegistration}
            >
              <Registration />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
