import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const ForgotPass = () => {
  const [email, setEmail] = useState("");

  const handleForgotPass = async () => {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/forgotPass/${email}`
    );

    toast.success("✅ Success!", {
      position: "center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  console.log(email);

  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <span>
        Please put your Email Address in the space provided. It will send a
        temporary password in your email.
      </span>
      <input
        style={{ width: "100%", height: "32px", fontSize: "20px" }}
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        style={{
          padding: "10px",
          border: "none",
          borderRadius: "10px",
          backgroundColor: "#2c5f78",
          color: "white",
          cursor: "pointer",
        }}
        onClick={handleForgotPass}
      >
        Forgot Password
      </button>
      <ToastContainer />
    </div>
  );
};

export default ForgotPass;
