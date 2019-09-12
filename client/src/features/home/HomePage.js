import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import { Product } from "@neuromarket/services";
import ProductsList from "../products/ProductsList";
import { Typography } from "@material-ui/core";

export default function HomePage() {

  const classes = useStyles();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const { products } = await Product.getAll();
      setProducts(products);
    }
    getProducts();
  }, []);
  return (
    <React.Fragment>
      <main>
        <Paper className={classes.mainFeaturedPost}>
          {
            <img
              style={{ display: "none" }}
              src="https://source.unsplash.com/user/erondu"
              alt="background"
            />
          }
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}></div>
            </Grid>
          </Grid>
        </Paper>
        <div className={classes.title}>
          <Typography variant="h3">Best Sellers</Typography>
        </div>
        <ProductsList products={products} />
        <Grid container spacing={5} className={classes.mainGrid}></Grid>
      </main>
    </React.Fragment>
  );
}
