import styled from "styled-components";
import { useFormik } from "formik";
import { signUpSchema } from "../../../schemas/authSchemas/signUpSchema/signUpschema";

const ContainerSignUp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SignUpDetails = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1em 2em;
  border-radius: 15px;
`;

const SignUpTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 250px;
  gap: 0.7em;
`;

const Input = styled.input`
  padding: 0.9em 1em;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 9px;
  outline: none;
`;

const Errors = styled.span`
  color: red;
  font-size: 0.785rem;
  margin-top: -0.5em;
  padding-left: 0.5em;
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5em;
  border-radius: 0.5em;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.shade};
  }
`;

const ChangeAuth = styled.span`
  color: ${({ theme }) => theme.colors.grey};
  font-size: 0.9rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

type Props = {
  changeAuthType: () => void;
};

interface SignUpForm<T> {
  email: T;
  password: T;
  confirmPassword: T;
}

interface User extends Omit<SignUpForm<string>, "confirmPassword"> {}

export const SignUp: React.FC<Props> = ({ changeAuthType }) => {
  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik<SignUpForm<string>>({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signUpSchema,
      onSubmit: (values, { resetForm, setErrors }) => {
        const newUser: User = {
          email: values.email,
          password: values.password,
        };

        const existingUsers: User[] = JSON.parse(
          localStorage.getItem("users") || "[]"
        );

        const isEmailRegistered: boolean = existingUsers.some(
          (user) => user.email === values.email
        );

        if (isEmailRegistered) {
          setErrors({
            email: "Email is registered.",
          });
          return;
        } else {
          existingUsers.push(newUser);
          localStorage.setItem("users", JSON.stringify(existingUsers));
          resetForm();
        }
      },
    });

  return (
    <ContainerSignUp>
      <SignUpDetails>
        <SignUpTitle>Sign Up</SignUpTitle>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && <Errors>{errors.email}</Errors>}
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <Errors>{errors.password}</Errors>
          )}
          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <Errors>{errors.confirmPassword}</Errors>
          )}
          <SubmitButton type="submit">Sign Up</SubmitButton>
          <ChangeAuth onClick={changeAuthType}>
            Already have an account? Sign In
          </ChangeAuth>
        </Form>
      </SignUpDetails>
    </ContainerSignUp>
  );
};
