import React, { useState } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

// Shared components
import { DisplayMode, SearchInput } from "../../../../components";
import Modal from "../../../../components/modal/modal";

// Component styles
import styles from "./styles";



const ProductsToolbar = props => {
  const [openModal, setOpenModal] = useState(false);

  const { classes, className } = props;

  const rootClassName = classNames(classes.root, className);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  function ModalForm() {
    return (
      <div>
        <FormControl fullWidth>
          <TextField variant='outlined' label='Product Title' required />
        </FormControl>
      </div>
    );
  }

  return (
    <div className={rootClassName}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          size="small"
          variant="outlined"
          onClick={() => !openModal && toggleModal()}
        >
          Add
          {openModal ? (
            <Modal
              dialogTitle="Add a product to your store"
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
          placeholder="Search product"
        />
        <span className={classes.spacer} />
        <DisplayMode mode="grid" />
      </div>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductsToolbar);
