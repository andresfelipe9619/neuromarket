import React, { useContext } from "react";
import ShopContext from "../../context/shop-context";

import Grid from "@material-ui/core/Grid";
import Productsview from "./Productsview";


const ProductsFound = props => {
    console.log("hola encontramos tu producto ");
    
  const { productsFound, addProductToCart, addProductToFavorites } = useContext(
    ShopContext
  );
  return (
    <React.Fragment>

      <Grid container spacing={4}>
        <Productsview products={productsFound} {...{ addProductToCart, addProductToFavorites }} />
      </Grid>

    </React.Fragment>
  );
};

export default ProductsFound;
