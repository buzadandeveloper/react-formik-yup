import * as Yup from "yup";

const phoneRegex = /^\(\+373\)-\d{2}-\d{3}-\d{3}$/;

export const infoFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid.")
    .test("is-gmail", "Email must be @gmail.com", (value) => {
      return !!value && value.endsWith("@gmail.com");
    })
    .required("Email is required"),
  tags: Yup.string()
    .test("are-plural-tags", "Every tag must to be plural", (value) => {
      return (
        !!value && value.split(",").every((tag) => tag.trim().endsWith("s"))
      );
    })
    .required("Tag is required."),
  phone: Yup.string().matches(phoneRegex, {message: "Incorect Format"}).required("Phone Number is required."),
});
