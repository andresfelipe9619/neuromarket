import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";

import { paymentInitialValues, paymentValidationSchema } from "./form-schemas";
export default function PaymentForm({
  classes,
  handleBack,
  handleNext,
  setOrderData,
  setPaymentData,
  setShippingData,
  showErrorMessage
}) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Formik
        initialValues={paymentInitialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log("values", values);
          setSubmitting(true);
          setPaymentData(values);
          handleNext();
          setSubmitting(false);
        }}
        validationSchema={paymentValidationSchema}
      >
        {formikProps => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit
          } = formikProps;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cardName"
                    label="Name on card"
                    fullWidth
                    value={values.cardName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.cardName && errors.cardName}
                    error={!!(touched.cardName && errors.cardName)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cardNumber"
                    label="Card number"
                    fullWidth
                    value={values.cardNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.cardNumber && errors.cardNumber}
                    error={!!(touched.cardNumber && errors.cardNumber)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="expiryDate"
                    label="Expiry date"
                    fullWidth
                    value={values.expiryDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.expiryDate && errors.expiryDate}
                    error={!!(touched.expiryDate && errors.expiryDate)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cvv"
                    label="CVV"
                    fullWidth
                    value={values.cvv}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      (touched.cvv && errors.cvv) ||
                      "Last three digits on signature strip"
                    }
                    error={!!(touched.cvv && errors.cardName)}
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
                <div className={classes.buttons}>
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                  >
                    Next
                  </Button>
                </div>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </>
  );
}
