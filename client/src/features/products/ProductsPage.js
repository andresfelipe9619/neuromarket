import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../../context/shop-context";
import { Product } from "@neuromarket/services";
import { Grid } from "@material-ui/core";
import ProductsList from "./ProductsList";
import UserContext from "../../context/user-context";

const ProductsPage = props => {
  const { addProductToCart, addProductToFavorites } = useContext(ShopContext);
  const { match } = props;
  const user = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      const query = `category=${match.params.id}`;
      const { products } = await Product.getAllBy(query);
      setProducts(products);
      setIsLoading(false);
    }
    getProducts();
  }, [match.params.id]);
  if (isLoading) return null;
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
