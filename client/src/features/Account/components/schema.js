import * as Yup from "yup";

export const profileValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Required"),
  password: Yup.string().required("Required")
});

export const detailsValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required"),
  phone: Yup.number(),
});

