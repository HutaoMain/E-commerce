import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  username: yup
    .string()
    .required("required")
    .min(11, "exact 11 numbers")
    .max(11, "exact 11 numbers")
    .test("oneOfRequired", "must start with 02000", function () {
      let prefixNum = "02000";
      let username = this.parent["username"];
      if (prefixNum && username) {
        return username.startsWith(prefixNum) ? true : false;
      }
    }),
  email: yup
    .string()
    .email("Invalid Email")
    .matches(/@stamaria.sti.edu.ph$/, { message: "Invalid Email" })
    .required("required"),
  password: yup
    .string()
    .min(4, "must be 4 characters min")
    .max(16, "must be 16 characters max")
    .required("required"),
  confirmPassword: yup
    .string()
    .required("required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  // birthday: yup.date().required("required").max(new Date()),
  // gender: yup.string().required(),
});
