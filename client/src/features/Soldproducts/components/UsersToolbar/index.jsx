import React, { useState } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Material components
import { Button, IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// Material icons
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";

// Shared components
import { DisplayMode, SearchInput } from "../../../../components";

// Component styles
import styles from "./styles";
import Modal from "../../../../components/modal/modal";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    alignContent: "center"
  },
  margin: {
    margin: theme.spacing(1)
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

const UsersToolbar = props => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const [openModal, setOpenModal] = useState(false);
  const { classes, className, selectedUsers } = props;
  const textInputClasses = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const rootClassName = classNames(classes.root, className);

  const ModalForm = () => {
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <FormControl fullWidth className={textInputClasses.margin}>
            <TextField
              id="outlined-name"
              label="Name:"
              required
              helperText="Enter member's name"
              autoComplete="name"
              className={classes.field}
              margin="dense"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Aa</InputAdornment>
                )
              }}
            />

            <TextField
              id="outlined-id-input"
              helperText="Enter user's ID"
              required
              label="ID:"
              className={classes.field}
              name="ID"
              placeholder="DEV705225"
              autoComplete="email"
              margin="dense"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">ID</InputAdornment>
                )
              }}
            />

            <TextField
              id="outlined-state"
              label="State"
              name="Select State"
              required
              className={classes.textField}
              margin="dense"
              variant="outlined"
              helperText="Enter user's State or province"
            />
            <TextField
              id="outlined-phone"
              label="Phone"
              type="number"
              placeholder="(300) 000-0000"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              variant="outlined"
              helperText="Enter user's phone number"
            />

            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Registration date"
              format="dd/MM/yyyy"
              disableFuture={true}
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </FormControl>
        </MuiPickersUtilsProvider>
      </div>
    );
  }

  return (
    <div className={rootClassName}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        {selectedUsers.length > 0 && (
          <IconButton className={classes.deleteButton}>
            <DeleteIcon />
          </IconButton>
        )}
        <Button
          className={classes.importButton}
          size="small"
          variant="outlined"
        >
          <ArrowDownwardIcon className={classes.importIcon} /> Import
        </Button>
        <Button
          className={classes.exportButton}
          size="small"
          variant="outlined"
        >
          <ArrowUpwardIcon className={classes.exportIcon} />
          Export
        </Button>
        <Button
          color="primary"
          size="small"
          variant="outlined"
          onClick={() => !openModal && toggleModal()}
        >
          Add
          {openModal ? (
            <Modal
              fullScreen={fullScreen}
              dialogTitle="Add a user to your Network"
              bodyContent={() => {
                return <ModalForm />;
              }}
              {...{ openModal, toggleModal }}
            />
          ) : null}
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
        />
        <span className={classes.spacer} />
        <DisplayMode mode="list" />
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedUsers: PropTypes.array
};

UsersToolbar.defaultProps = {
  selectedUsers: []
};

export default withStyles(styles)(UsersToolbar);
