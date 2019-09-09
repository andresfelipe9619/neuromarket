import React, { useContext } from "react";
import ShopContext from "../../context/shop-context";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Product from "../products/Product";
import QuantitySelect from "../../components/quantity-select";
import useStyles from "./styles";
const CartPage = props => {
  const {
    cart,
    subtotal,
    removeProductFromCart,
    addProductToCart
  } = useContext(ShopContext);
  const classes = useStyles();
  const goTo = route => event => props.history.push(route);
  return (
    <React.Fragment>
      {cart.length <= 0 ? (
        <Paper>
          <Typography variant="h5">No Item in the Cart!</Typography>
        </Paper>
      ) : (
        <Grid container spacing={8}>
          <Grid container spacing={8} item xs={9} sm={9}>
            {/* <Paper> */}
            <Grid
              container
              item
              xs={12}
              sm={12}
              alignItems="center"
              justify="center"
            >
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
            {cart.map(product => {
              const { _id, price, quantity, ammount } = product;
              return (
                <Grid
                  key={_id}
                  container
                  item
                  xs={12}
                  sm={12}
                  spacing={8}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={3}>
                    <Product product={product} />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <QuantitySelect
                      quantity={quantity}
                      remove={removeProductFromCart.bind(this, _id)}
                      add={addProductToCart.bind(this, product)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography align="center" variant="h6" a>
                      {price}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography align="center" variant="h6">
                      {ammount}
                    </Typography>
                  </Grid>
                  <hr />
                </Grid>
              );
            })}
            {/* </Paper> */}
          </Grid>
          <Grid container item xs={3} sm={3} justify="center">
            {/* <Paper> */}
            <Grid item xs={12} sm={12}>
              <Typography variant="h6">
                {" "}
                Subtotal: USD
                {subtotal}
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8}>
              <Button
                variant="contained"
                color="secondary"
                onClick={goTo("/checkout")}
              >
                Proceed with the Checkout
              </Button>
            </Grid>
            {/* </Paper> */}
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default CartPage;
