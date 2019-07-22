import React, { useContext } from "react";
import ShopContext from "../../context/shop-context";

import Grid from "@material-ui/core/Grid";
import Productsview from "./Productsview";


const ProductsPage = props => {
  const { products, addProductToCart, addProductToFavorites } = useContext(
    ShopContext
  );
  return (
    <React.Fragment>

      <Grid container spacing={4}>
        <Productsview products={products} {...{ addProductToCart, addProductToFavorites }} />
      </Grid>

    </React.Fragment>
  );
};

export default React.memo(ProductsPage);
