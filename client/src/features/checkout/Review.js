import React, { useContext } from "react";
import UserContext from "../../context/user-context";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Order } from "@neuromarket/services";
export default function Review({
  cart,
  classes,
  subtotal,
  handleBack,
  paymentData,
  shippingData,
  showOrderSuccesMessage
}) {
  const user = useContext(UserContext);
  const {
    firstName,
    lastName,
    address,
    city,
    state,
    country,
    zip
  } = shippingData;
  const handlePlaceOrder = async () => {
    const orderData = {
      address: {
        address,
        city,
        state,
        country,
        zip
      },
      products: cart,
      user: user._id
    };
    try {
      await Order.create(orderData);
      showOrderSuccesMessage();
    } catch (error) {
      console.log("error", error);
    }

  };

  const ObjectKeyToHumanString = key => {
    if (!key) return "";
    return key
      .split(/(?=[A-Z])/)
      .map(
        ([first, ...rest]) =>
          `${first.toUpperCase()}${rest.join("").toLowerCase()}`
      )
      .join(" ");
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`$${product.price} x ${product.quantity}`}
            />
            <Typography variant="body2">
              ${product.price * product.quantity}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {subtotal}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {lastName}, {firstName}
          </Typography>
          <Typography gutterBottom>
            {[address, city, state, country].join(", ")}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {Object.keys(paymentData).map(payment => (
              <React.Fragment key={payment}>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    {ObjectKeyToHumanString(payment)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{paymentData[payment]}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button onClick={handleBack} className={classes.button}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlaceOrder}
            className={classes.button}
          >
            Place order
          </Button>
        </div>
      </Grid>
    </>
  );
}
