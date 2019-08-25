import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";

import { addressInitialValues, addressValidationSchema } from "./form-schemas";
function AddressForm({
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
        Shipping address
      </Typography>
      <Formik
        initialValues={addressInitialValues}
        onSubmit={(values, { setSubmitting, ...rest }) => {
          console.log("values", { values, rest });
          setSubmitting(true);
          setShippingData(values)
          handleNext();
          setSubmitting(false);
        }}
        validationSchema={addressValidationSchema}
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="firstName"
                    label="First name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.firstName && errors.firstName}
                    error={!!(touched.firstName && errors.firstName)}
                    required
                    fullWidth
                    autoComplete="fname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.lastName && errors.lastName}
                    error={!!(touched.lastName && errors.lastName)}
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.address && errors.address}
                    error={!!(touched.address && errors.address)}
                    required
                    id="address"
                    name="address"
                    label="Address line "
                    fullWidth
                    autoComplete="billing address-line"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.city && errors.city}
                    error={!!(touched.city && errors.city)}
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="billing address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.state && errors.state}
                    error={!!(touched.state && errors.state)}
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.zip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.zip && errors.zip}
                    error={!!(touched.zip && errors.zip)}
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="billing postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.country && errors.country}
                    error={!!(touched.country && errors.country)}
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="billing country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        name="saveAddress"
                        value="yes"
                      />
                    }
                    label="Use this address for payment details"
                  />
                </Grid>
                <div className={classes.buttons}>
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
export default React.memo(AddressForm);
