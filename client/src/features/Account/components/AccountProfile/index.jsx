import React, { useContext } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Avatar, Typography, Button, LinearProgress } from "@material-ui/core";

// Shared components
import { Portlet, PortletContent, PortletFooter } from "../../../../components";

// Component styles
import styles from "./styles";

import UserContext from "../../../../context/user-context";

const AccountProfile = props => {
  const user = useContext(UserContext);
  const { classes, className, ...rest } = props;
  const rootClassName = classNames(classes.root, className);
  const imgSrc = user.img ? user.img : '/images/avatars/empty_avatar.png';


  return (
    <Portlet {...rest} className={rootClassName}>
      <PortletContent>
        <div className={classes.details}>
          <div className={classes.info}>
            <Avatar
              className={classes.avatar}
              src={imgSrc}
            />
            <Typography variant="h2">{user.name}</Typography>
            <Typography className={classes.locationText} variant="body1">
              Rm. Valcea, Romania
            </Typography>
            <Typography className={classes.dateText} variant="body1">
              4:32PM (GMT-4)
            </Typography>
          </div>
        </div>
        <div className={classes.progressWrapper}>
          <Typography variant="body1">Profile Completeness: 85%</Typography>
          <LinearProgress value={85} variant="determinate" />
        </div>
      </PortletContent>
      <PortletFooter>
        <Button className={classes.uploadButton} color="primary" variant="text">
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </PortletFooter>
    </Portlet>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
