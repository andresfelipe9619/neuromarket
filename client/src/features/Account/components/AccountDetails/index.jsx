import React, { useState } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import { withStyles, CircularProgress } from "@material-ui/core";

// Material components
import { Button, TextField } from "@material-ui/core";

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from "../../../../components";

// Component styles
import styles from "./styles";


//Form control
import { Formik } from "formik";
import { detailsValidationSchema } from "../schema";

const Account = props => {
  const [isLoading, setIsLoading] = useState(false);
  const { classes, className, ...rest } = props;
  const rootClassName = classNames(classes.root, className);

  const handleSave = async () => {
    // setIsLoading(true)
    // try{

    // }catch (error){
    //   setIsLoading(false);
    // }
  };

  return (
    <Formik onSubmit={handleSave} validationSchema={detailsValidationSchema}>
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
          <Portlet {...rest} className={rootClassName}>
            <PortletHeader>
              <PortletLabel
                subtitle="The information can be edited"
                title="Profile"
              />
            </PortletHeader>
            <PortletContent noPadding>
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className={classes.field}>
                  <TextField
                    className={classes.textField}
                    label="Name"
                    name="name"
                    margin="dense"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.name && errors.name}
                    error={!!(touched.name && errors.name)}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </div>
                <div className={classes.field}>
                  <TextField
                    className={classes.textField}
                    label="Email Address"
                    name="email"
                    margin="dense"
                    value={values.email}
                    variant="outlined"
                    disabled
                  />
                  <TextField
                    className={classes.textField}
                    label="Phone Number"
                    name="phone"
                    margin="dense"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.phone && errors.phone}
                    error={!!(touched.phone && errors.phone)}
                    type="number"
                    value={values.phone}
                    variant="outlined"
                  />
                </div>
              </form>
            </PortletContent>
            <PortletFooter className={classes.portletFooter}>
              <Button color="primary" variant="contained" type="submit">
                Save details
              </Button>
            </PortletFooter>
            {isLoading ? <CircularProgress className={classes.progress} /> : null}
          </Portlet>
        );
      }}
    </Formik>
  );
};

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
