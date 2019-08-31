import React, { useContext } from "react";
import ShopContext from "../../context/shop-context";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Product from "../products/Product";
import QuantitySelect from "../../components/quantity-select";

const CartPage = props => {
  const { cart, subtotal, removeProductFromCart } = useContext(ShopContext);
  //const classes = useStyles();
  const goTo = route => event => props.history.push(route);

  // useEffect(() => {
  //   console.log(context);
  // }, []);

  return (
    <React.Fragment>
      <Paper>
        {cart.length <= 0 ? (
          <Typography variant="h5">No Item in the Cart!</Typography>
        ) : (
          <Grid container spacing={8} alignContent="center" justify="center">
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
            <hr />
            {cart.map(({ _id, name, price, quantity, ammount, imageUrl }) => (
              <Grid
                key={_id}
                container
                item
                xs={12}
                sm={12}
                spacing={8}
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={3}>
                  <Product product={{ _id, name, price, imageUrl }} />
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={removeProductFromCart.bind(this, _id)}
                  >
                    Remove from Cart
                  </Button> */}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6">{quantity}</Typography>
                  <QuantitySelect />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6">{price}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6">{ammount}</Typography>
                </Grid>
                <hr />
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
              <Button
                variant="contained"
                color="secondary"
                onClick={goTo("/checkout")}
              >
                Proceed with the Checkout
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default CartPage;
