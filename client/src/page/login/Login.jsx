import "./Login.css";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../../images/logo.png";
import { FaUserCircle } from "react-icons/fa";
import Modal from "react-modal";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom/dist";
import { AuthContext } from "../../contextAPI/AuthContext";
import Registration from "./registration/Registration";
import ForgotPass from "./forgotPassword/ForgotPass";
import FbLoginButton from "../../components/facebookLogin/FbLoginButton";
import GoogleLoginButton from "../../components/googleLogin/GoogleLoginButton";

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
  const [emailAvailable, setEmailAvailable] = useState(true);

  const { loading, error, dispatch } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChangeLogin = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleEmailCheck = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/${credentials.email}`
      );
      setEmailAvailable(res.data.isEnabled);
    } catch (err) {
      console.error(err);
      setEmailAvailable(false);
    }
  };

  const handleLogin = async () => {
    handleEmailCheck();
    if (!emailAvailable) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: { message: "You are not allowed!" },
      });
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/auth/login`,
        credentials
      );
      if (res.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: credentials.email });
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
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleModalForgotPass = () => {
    setIsOpenForgotPass(!isOpenForgotPass);
  };

  useEffect(() => {
    handleEmailCheck();
    const keyDownHandler = (event) => {
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
      <div className="first-bar-design "></div>
      <div className="second-bar-design"></div>
      <div className="loginContainer">
        <div className="leftLogin">
          <img src={logo} alt="Logo" className="loginLogo" />
          <h1>Welcome to Beauty Avenue</h1>
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
              {/* <div>
        <FbLoginButton />
      </div>
      <div>
        <GoogleLoginButton />
      </div> */}
              {error && <span>{error.message}</span>}

              <Link to="/">
                <button className="login-close-btn">x</button>
              </Link>
              {/* <span className="forgotPassClick" onClick={toggleModalForgotPass}>
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
              </button> */}
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
