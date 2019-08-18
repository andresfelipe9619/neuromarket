import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../../context/shop-context";
import { Product } from "@neuromarket/services";
import Grid from "@material-ui/core/Grid";
import ProductsList from "./ProductsList";

const ProductsPage = props => {
  const { addProductToCart, addProductToFavorites } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      console.log("executing");
      const { products } = await Product.getAll();
      console.log("products", products);
      setProducts(products);
    }
    getProducts();
  }, []);
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <ProductsList
          products={products}
          {...{ addProductToCart, addProductToFavorites }}
        />
      </Grid>
    </React.Fragment>
  );
};

export default React.memo(ProductsPage);
