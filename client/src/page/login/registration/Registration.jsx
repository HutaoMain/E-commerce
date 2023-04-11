import "./Registration.css";
import { registrationSchema } from "../../../validations/RegistrationValidation";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import useFetch from "../../../contextAPI/useFetch";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

const Registration = () => {
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const secretQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "In what city were you born?",
    "What is your favorite book?",
    "What is your favorite movie?",
  ];

  console.log(selectedQuestion);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/user/register`,
      values
    );

    toast.success("✅ Success!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const { values, touched, errors, isValid, dirty, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        secretQuestion: "",
        secretAnswer: "",
      },
      validationSchema: registrationSchema,
      onSubmit,
    });

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/user/${values.email}`
  );

  return (
    <div className="myModal">
      <h1>Sign up</h1>
      <p>It's quick and easy. Click outside to close the modal.</p>
      <hr />

      <form>
        <input
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          id="name"
          placeholder="Name"
          className="myModalInputName"
        />
        {errors.name && touched.name && (
          <div className="error-message">{errors.name}</div>
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

        <select
          className="my-modal-selected-question"
          value={values.secretQuestion}
          onChange={(event) => {
            handleChange(event);
            setSelectedQuestion(event.target.value);
          }}
          name="secretQuestion"
        >
          <option value="">Select a secret question</option>
          {secretQuestions.map((question, index) => (
            <option key={index} value={question}>
              {question}
            </option>
          ))}
        </select>

        <input
          value={values.secretAnswer}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          id="secretAnswer"
          placeholder="Please Answer"
          className="myModalInputLong"
        />

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
        </Link>
      </form>
    </div>
  );
};

export default Registration;
