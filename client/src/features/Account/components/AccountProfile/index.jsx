import React from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Avatar, Typography, Button, LinearProgress } from '@material-ui/core';

// Shared components
import { Portlet, PortletContent, PortletFooter } from '../../../../components';

// Component styles
import styles from './styles';

const AccountProfile = props => {
    const { classes, className, ...rest } = props;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">John Doe</Typography>
              <Typography
                className={classes.locationText}
                variant="body1"
              >
                Rm. Valcea, Romania
              </Typography>
              <Typography
                className={classes.dateText}
                variant="body1"
              >
                4:32PM (GMT-4)
              </Typography>
            </div>
            <Avatar
              className={classes.avatar}
              src="/images/avatars/avatar_1.png"
            />
          </div>
          <div className={classes.progressWrapper}>
            <Typography variant="body1">Profile Completeness: 85%</Typography>
            <LinearProgress
              value={85}
              variant="determinate"
            />
          </div>
        </PortletContent>
        <PortletFooter>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text"
          >
            Upload picture
          </Button>
          <Button variant="text">Remove picture</Button>
        </PortletFooter>
      </Portlet>
    );
  }

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
