import React, { useContext } from "react";
import ShopContext from "../../context/shop-context";

import Grid from "@material-ui/core/Grid";
import { ProductsList } from "../products";

const FavoritesPage = props => {
  const { favorites, addProductToCart } = useContext(ShopContext);
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <ProductsList products={favorites} {...{ addProductToCart }} />
      </Grid>
    </React.Fragment>
  );
};

export default React.memo(FavoritesPage);
