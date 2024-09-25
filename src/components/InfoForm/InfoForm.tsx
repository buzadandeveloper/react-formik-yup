import styled from "styled-components";
import { useFormik } from "formik";
import { infoFormSchema } from "../../schemas/infoFormSchema/infoFormSchema";
import { IMaskInput } from "react-imask";

const ContainerInfoForm = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  background-color: white;
  padding: 2em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Input = styled.input`
  outline: none;
  padding: 0.5em 1.2em;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 8px;
`;

const Errors = styled.span`
  color: red;
  font-size: 0.785rem;
`;

const ButtonSubmit = styled.button`
  cursor: pointer;
`;

interface Form {
  email: string;
  tags: string;
  phone: string;
}

export const InfoForm: React.FC = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik<Form>({
      initialValues: {
        email: "",
        tags: "",
        phone: "",
      },
      validationSchema: infoFormSchema,
      onSubmit: (values, { resetForm }) => {
        console.log(values);
        resetForm();
      },
    });
  return (
    <ContainerInfoForm>
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
          placeholder="Tags"
          name="tags"
          value={values.tags}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.tags && touched.tags && <Errors>{errors.tags}</Errors>}
        <IMaskInput
          name="phone"
          placeholder="(+373)-00-000-000"
          mask="(+373)-**-***-***"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.phone && touched.phone && <Errors>{errors.phone}</Errors>}
        <ButtonSubmit>Submit</ButtonSubmit>
      </Form>
    </ContainerInfoForm>
  );
};
