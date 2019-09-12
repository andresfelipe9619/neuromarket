import React, { useState, useContext } from "react";

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
import UserContext from "../../../../context/user-context";
import AlertContext from "../../../../context/alert-context";
import { User } from "@neuromarket/services";

const Account = props => {
  const [isLoading, setIsLoading] = useState(false);
  const { classes, className, ...rest } = props;
  const rootClassName = classNames(classes.root, className);
  const user = useContext(UserContext);
  const { openAlert } = useContext(AlertContext);

  const handleSave = async values => {
    setIsLoading(true);
    try {
      await User.update({
        _id: user._id,
        name: values.name,
        phone: values.phone
      });
      let modifiedUser = await User.get(user._id);
      user.userLoggedIn({
        _id: modifiedUser._id,
        name: modifiedUser.name,
        email: modifiedUser.email,
        img: modifiedUser.img,
        phone: modifiedUser.phone
      });
    } catch (error) {
      setIsLoading(false);
      openAlert({
        message: "Error while saving new details",
        variant: "error"
      });
    }
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
                    value={user.email}
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
            {isLoading ? (
              <CircularProgress className={classes.progress} />
            ) : null}
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
