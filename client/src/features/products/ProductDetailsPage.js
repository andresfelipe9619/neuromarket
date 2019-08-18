import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../../context/shop-context";
import Grid from "@material-ui/core/Grid";
import ProductCard from "./Product";
import { Product } from "@neuromarket/services";
const ProductsDetailsPage = props => {
  const { addProductToCart, addProductToFavorites } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const { match } = props;

  useEffect(() => {
    const id = (match.params || {}).id;
    async function getProduct() {
      const { product } = await Product.get(id);
      setProduct(product);
    }

    id && getProduct();
  }, [match.params]);

  if (!product) return "Product Not Found";
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard
            key={product.id}
            {...{ product, addProductToCart, addProductToFavorites }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProductsDetailsPage;
