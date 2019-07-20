import React, { useContext } from "react";
import ShopContext from "../../context/shop-context";

import Grid from "@material-ui/core/Grid";
import Product from "./Product";

const ProductsPage = props => {
  const { products, addProductToCart, addProductToFavorites } = useContext(
    ShopContext
  );
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Product
              key={product.id}
              {...{ product, addProductToCart, addProductToFavorites }}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default React.memo(ProductsPage);
