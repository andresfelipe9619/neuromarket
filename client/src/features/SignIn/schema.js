import * as Yup from "yup";

export const userValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .required("Required")
});
