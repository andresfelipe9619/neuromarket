import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../../context/shop-context";
import { Product } from "@neuromarket/services";
import { Grid, LinearProgress } from "@material-ui/core";
import ProductsList from "./ProductsList";
import UserContext from "../../context/user-context";

const ProductsPage = props => {
  const { addProductToCart, addProductToFavorites } = useContext(ShopContext);
  const user = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log("user", user);
  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      const { products } = await Product.getAll();
      setProducts(products);
      setIsLoading(false);
    }
    getProducts();
  }, []);
  if (isLoading) return <LinearProgress />;
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <ProductsList
          products={products}
          {...{
            addProductToCart,
            ...(user.loggedIn ? { addProductToFavorites } : null)
          }}
        />
      </Grid>
    </React.Fragment>
  );
};

export default React.memo(ProductsPage);
