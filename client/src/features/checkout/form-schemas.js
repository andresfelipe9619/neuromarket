import * as Yup from "yup";

export const addressInitialValues = {
  address: "asdkasjdkasd",
  firstName: "andres",
  lastName: "suarez",
  city: "cali",
  state: "valle",
  zip: "abccd",
  country: "colombia"
};

export const addressValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  city: Yup.string().required("Required")
});

export const paymentInitialValues = {
  cardName: "",
  cardNumber: "",
  expiryDate: "",
  cvv: ""
};

export const paymentValidationSchema = Yup.object().shape({
  cardName: Yup.string().required("Required"),
  cardNumber: Yup.string().required("Required"),
  expiryDate: Yup.string().required("Required"),
  cvv: Yup.string().required("Required")
});
