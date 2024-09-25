import styled from "styled-components";
import { useFormik } from "formik";
import { signInSchema } from "../../../schemas/authSchemas/signInSchema/signInSchema";

const ContainerSignIn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SignInDetails = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1em 2em;
  border-radius: 15px;
`;

const SignInTitle = styled.h1`
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

interface SignInForm<T> {
  email: T;
  password: T;
}

interface User extends SignInForm<string> {}

export const SignIn: React.FC<Props> = ({ changeAuthType }) => {
  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik<SignInForm<string>>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signInSchema,
      onSubmit: (values, { resetForm, setErrors }) => {
        const storedUser: User[] = JSON.parse(
          localStorage.getItem("users") || "[]"
        );

        const user: User | undefined = storedUser.find(
          (user: User) =>
            user.email === values.email && user.password === values.password
        );

        if (user) {
          resetForm();
        } else {
          setErrors({
            email: "Email or password is incorrect.",
            password: "Email or password is incorrect.",
          });
        }
      },
    });

  return (
    <ContainerSignIn>
      <SignInDetails>
        <SignInTitle>Sign In</SignInTitle>
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
          <SubmitButton type="submit">Sign In</SubmitButton>
          <ChangeAuth onClick={changeAuthType}>
            Don't have an account? Sign up
          </ChangeAuth>
        </Form>
      </SignInDetails>
    </ContainerSignIn>
  );
};
