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
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

// Shared components
import { DisplayMode, SearchInput } from "../../../../components";
import Modal from "../../../../components/modal/modal";

// Component styles
import styles from "./styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

//Dropzone to add files
import Dropzone from "../../../../components/dropzone/dropzone";

const quantityOptions = [
  {
    value: "1",
    label: "1"
  },
  {
    value: "2",
    label: "2"
  },
  {
    value: "3",
    label: "3"
  },
  {
    value: "4",
    label: "4"
  },
  {
    value: "5",
    label: "5"
  },
  {
    value: "5-10",
    label: "5 - 10"
  }
];
const currencies = [
  {
    value: "COP",
    label: "COP$"
  },
  {
    value: "USD",
    label: "USD$"
  },
  {
    value: "EUR",
    label: "€"
  },
  {
    value: "BTC",
    label: "฿"
  },
  {
    value: "JPY",
    label: "¥"
  }
];

const categories = [
  {
    value: "TECH",
    label: "Technology"
  },
  {
    value: "ENTERTAINMENT",
    label: "Entertainment"
  },
  {
    value: "SPORTS",
    label: "Sports"
  },
  {
    value: "HOME",
    label: "Home"
  }
];

const ProductsToolbar = props => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const [openModal, setOpenModal] = useState(false);
  const [values, setValues] = useState({
    name: "",
    age: "",
    multiline: "",
    quantityOption: "1",
    currency: "COP",
    category: "TECH"
  });

  const { classes, className } = props;

  const rootClassName = classNames(classes.root, className);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const ModalForm = () => {
    return (
      <div>
        <div>
          <Dropzone />
        </div>
        <div>
          <FormControl fullWidth margin="normal">
            <TextField
              id="outlined-name"
              label="Name:"
              required
              helperText="Enter product's name"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Aa</InputAdornment>
                )
              }}
            />
            <TextField
              id="outilined-multiline-flexible"
              label="Description:"
              multiline
              rowsMax="5"
              margin="normal"
              helperText="Please provide a product description"
              variant="outlined"
            />
          </FormControl>
          <FormControl margin="normal">
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Currency:"
                  value={values.currency}
                  className={classes.select}
                  onChange={handleChange("currency")}
                  helperText="Please select your currency"
                  margin="normal"
                  variant="outlined"
                >
                  {currencies.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-price"
                  label="Price:"
                  type="number"
                  required
                  helperText="Enter product's price"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {values.currency}
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  id="outlined-select-quantity"
                  select
                  label="Available quantity"
                  className={classes.select}
                  value={values.quantityOption}
                  onChange={handleChange("quantityOption")}
                  helperText="Select available quantity"
                  margin="normal"
                  variant="outlined"
                >
                  {quantityOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-select-category"
                  select
                  label="Product Category"
                  className={classes.select}
                  value={values.category}
                  onChange={handleChange("category")}
                  helperText="Select product's category"
                  margin="normal"
                  variant="outlined"
                >
                  {categories.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </FormControl>
        </div>
      </div>
    );
  };

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
              fullScreen={fullScreen}
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
