import "./Login.css";
import logo from "../../assets/images/logo.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom/dist";
import { AuthContext } from "../../contextApi/AuthContext";
import useFetch from "../../contextApi/useFetch";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/user/${credentials?.email}`
  );

  const navigate = useNavigate();

  const handleChangeLogin = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log(credentials);

  useEffect(() => {
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

  const handleLogin = async () => {
    dispatch({ type: "LOGIN_START" });
    if (data?.userRole === "ROLE_ADMIN") {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/user/login`,
          credentials
        );
        if (res.status === 200) {
          dispatch({ type: "LOGIN_SUCCESS", payload: credentials });
          navigate("/", { replace: true });
        } else {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: { message: "You are not allowed!" },
          });
          setErrorMessage("You are not allowed!");
        }
      } catch (err) {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "User not correct!" },
        });
        setErrorMessage("User not correct!");
      }
    } else {
      setErrorMessage("You are not allowed!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <p>Your ultimate relief for your dry skin.. glowing skin always in..</p>
        <h2>Beauty Avenue</h2>
      </div>
      <div className="login-right">
        <img className="login-logo" src={logo} />
        <h1>Hello Admin!</h1>
        <div>
          <section className="login-right-itemlist">
            <label>Email:</label>
            <input type="email" id="email" onChange={handleChangeLogin} />
          </section>
          <section className="login-right-itemlist">
            <label>Password:</label>
            <input type="password" id="password" onChange={handleChangeLogin} />
          </section>
          {errorMessage && <div>{errorMessage}</div>}
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
        <p>
          <Link to="/forgotPassword">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

/* <div className="login">
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
</div> */
