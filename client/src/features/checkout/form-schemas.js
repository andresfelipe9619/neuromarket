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
  cardName: "Mastercard",
  cardNumber: "12312312",
  expiryDate: "19/20",
  cvv: "123"
};

export const paymentValidationSchema = Yup.object().shape({
  cardName: Yup.string().required("Required"),
  cardNumber: Yup.string().max(16).required("Required"),
  expiryDate: Yup.string().required("Required"),
  cvv: Yup.string()
    .max(3)
    .required("Required")
});
