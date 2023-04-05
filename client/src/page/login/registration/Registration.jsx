import "./Registration.css";
import { registrationSchema } from "../../../validations/RegistrationValidation";
import { useFormik } from "formik";
// import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useState } from "react";
// import PopupMessage from "../../../components/popupMessage/PopupMessage";
import useFetch from "../../../contextAPI/useFetch";
import { ToastContainer, toast } from "react-toastify";

const Registration = () => {
  // const [open, setOpen] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/registration`,
      values
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

  const {
    values,
    touched,
    errors,
    isValid,
    dirty,
    handleBlur,
    handleChange,
    // setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      // birthday: new Date(),
      // gender: "Male",
    },
    validationSchema: registrationSchema,
    onSubmit,
  });

  const { data } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/user/${values.email}`
  );

  return (
    <div className="myModal">
      <h1>Sign up</h1>
      <p>It's quick and easy. Click outside to close the modal.</p>
      <hr />

      <form>
        <input
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          id="firstName"
          placeholder="First Name"
          className="myModalInputName"
        />
        {errors.firstName && touched.firstName && (
          <div className="error-message">{errors.firstName}</div>
        )}

        <input
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          id="lastName"
          placeholder="Last Name"
          className="myModalInputName"
        />
        {errors.lastName && touched.lastName && (
          <div className="error-message">{errors.lastName}</div>
        )}

        <br />
        <input
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          id="username"
          placeholder="Student No."
          className="myModalInputNumber"
        />
        {errors.username && touched.username && (
          <div className="error-message">{errors.username}</div>
        )}
        {data.username === values.username ? (
          <p style={{ color: "red", fontSize: "13px" }}>
            Username already exist
          </p>
        ) : (
          ""
        )}

        <br />
        <input
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          id="email"
          placeholder="Email Address"
          className="myModalInputLong"
        />
        {errors.email && touched.email && (
          <div className="error-message">{errors.email}</div>
        )}
        {data.email === values.email ? (
          <p style={{ color: "red", fontSize: "13px" }}>Email already exist </p>
        ) : (
          ""
        )}

        <br />
        <input
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          id="password"
          placeholder="Your Password"
          className="myModalInputLong"
        />
        {errors.password && touched.password && (
          <div className="error-message">{errors.password}</div>
        )}
        <br />
        <input
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="myModalInputLong"
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <div className="error-message">{errors.confirmPassword}</div>
        )}

        {/* <br />
        <label className="myModalLabel">
          Birthday: <i style={{ fontSize: "10px" }}>optional</i>
        </label>
        <DatePicker
          className="myModalBirthday"
          selected={values.birthday}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => setFieldValue("birthday", date)}
        />
        {errors.birthday && (
          <div className="error-message">{errors.birthday}</div>
        )}

        <label className="myModalLabel">
          Gender: <i style={{ fontSize: "10px" }}>optional</i>
        </label>
        <select
          value={values.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          className="myModalGender"
          id="gender"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select> */}

        <p className="myModalTermsnCondition">
          By clicking Sign Up, you agree to our
          <a href="https://www.freeprivacypolicy.com/live/5a46039b-a294-45bd-8f5d-1b3df5d3ff6a?fbclid=IwAR00FCUTAD50fzhm3O-uxbS8oRkjzbIE8o4LcVNDgbsy1wV4KxxAurQaSwE">
            <b style={{ borderBottom: "1px solid black" }}>
              {" "}
              Terms, Privacy Policy and Cookies Policy.
            </b>
          </a>
        </p>
        <Link to="/">
          <button
            type="submit"
            className={
              !(isValid && dirty) || data.email === values.email
                ? "error-button"
                : "myModalSignUp"
            }
            disabled={!(isValid && dirty) || data.email === values.email}
            onClick={onSubmit}
          >
            Sign Up
          </button>
          <ToastContainer />
          {/* {open ? (
            <PopupMessage
              text="Successful Registration!"
              closePopup={() => setOpen(false)}
            />
          ) : null} */}
        </Link>
      </form>
    </div>
  );
};

export default Registration;
