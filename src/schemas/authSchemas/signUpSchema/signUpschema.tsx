import * as Yup from "yup";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Email is required."),
  password: Yup.string()
    .matches(passwordRegex, { message: "Password must include: minimum 8 characters, one uppercase letter, one lowercase letter, one number, and one special character." })
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password do not match.")
    .required("Confirm password is required."),
});
