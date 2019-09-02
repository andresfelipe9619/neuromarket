import * as Yup from "yup";

const userValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .required("Required")
});

export default userValidationSchema;