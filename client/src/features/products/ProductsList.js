import React from "react";
import Product from "./Product";
import Grid from "@material-ui/core/Grid";

const ProductsList = ({ products, ...actions }) => {
  if (!products.length) return <p>No Items found</p>;
  return (
    <Grid container spacing={4}>
      {products.map(product => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Product key={product.id} {...{ product, ...actions }} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;
