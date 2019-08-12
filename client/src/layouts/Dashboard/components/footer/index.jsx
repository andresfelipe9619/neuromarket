import React from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Divider } from '@material-ui/core';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  company: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 0.5
  }
});

const Footer = props => {
  const { classes, className } = props;

  const rootClassName = classNames(classes.root, className);

  return (
    <div className={rootClassName}>
      <Divider />
    </div>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
