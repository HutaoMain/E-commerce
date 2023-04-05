import "./Login.css";
import logo from "../../assets/images/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";
import { AuthContext } from "../../contextApi/AuthContext";
import useFetch from "../../contextApi/useFetch";
import { UrlPath } from "../../UrlPath";

const Login = () => {
  const { loading, error, dispatch } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { data } = useFetch(`${UrlPath}/api/user/${credentials?.email}`);

  console.log(data.userRole);

  console.log(credentials.email);

  const navigate = useNavigate();

  const handleChangeLogin = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async () => {
    if (data?.userRole === "ROLE_ADMIN") {
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

  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log("User pressed: ", event.key);
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
            <p>Admin</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
