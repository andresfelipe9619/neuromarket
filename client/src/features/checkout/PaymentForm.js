import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Formik } from "formik";
import * as Yup from "yup";

export default function PaymentForm({ bindSubmitForm }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Formik
        initialValues={{
          address: "",
          firstName: "",
          lastName: "",
          city: "",
          state: "",
          zip: "",
          country: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          setTimeout(() => setSubmitting(false), 2000);
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          city: Yup.string().required("Required")
        })}
      >
        {formikProps => {
          const {
            values,
            touched,
            errors,
            submitForm,
            isValid,
            handleChange,
            handleBlur,
            handleSubmit
          } = formikProps;

          bindSubmitForm(submitForm, isValid);
          return (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardName"
                  label="Name on card"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardNumber"
                  label="Card number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="expDate"
                  label="Expiry date"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cvv"
                  label="CVV"
                  helperText="Last three digits on signature strip"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox color="secondary" name="saveCard" value="yes" />
                  }
                  label="Remember credit card details for next time"
                />
              </Grid>
            </Grid>
          );
        }}
      </Formik>
    </>
  );
}
