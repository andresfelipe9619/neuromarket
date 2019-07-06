import React, { useContext, useEffect } from "react";
import ShopContext from "../../context/shop-context";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import useStyles from "./styles";
const CartPage = props => {
  const context = useContext(ShopContext);
  const classes = useStyles();
  const goTo = route => event => props.history.push(route);

  useEffect(() => {
    console.log(context);
  }, [context]);
  let subtotal = context.cart.reduce((subtotal, { price, quantity }) => {
    let ammount = price * quantity;
    return ammount + subtotal;
  }, 0);
  subtotal = +parseFloat(subtotal, 2);
  return (
    <React.Fragment>
      <Paper>
        {context.cart.length <= 0 ? (
          <Typography variant="h5">No Item in the Cart!</Typography>
        ) : (
          <Grid container spacing={2}>
            <Grid container item xs={12} sm={12}>
              <Grid item xs={12} sm={3}>
                <Typography variant="h5">Product</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h5">Quantity</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h5">Unit Price</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h5">Ammount</Typography>
              </Grid>
            </Grid>
            {context.cart.map(({ id, title, price, quantity }) => (
              <Grid key={id} container item xs={12} sm={12}>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6">{title}</Typography>
                  <button
                    onClick={context.removeProductFromCart.bind(this, id)}
                  >
                    Remove from Cart
                  </button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6">{quantity}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6">{price}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6">{price * quantity}</Typography>
                </Grid>
              </Grid>
            ))}

            <Grid
              container
              item
              xs={12}
              sm={12}
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
            >
              <Typography variant="h6">
                Subtotal: USD
                {subtotal}
              </Typography>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={goTo("/checkout")}
            >
              Proceed with the Checkout
            </Button>
          </Grid>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default CartPage;
