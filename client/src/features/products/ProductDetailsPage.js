import React, { useContext, useEffect, useState, useCallback } from "react";
import ShopContext from "../../context/shop-context";
import Grid from "@material-ui/core/Grid";
import { Product } from "@neuromarket/services";
import ProductImage from "./ProductImage";
import QuantitySelect from "../../components/quantity-select";
import { Typography, Button, Divider } from "@material-ui/core";
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

  const handleOnAddProduct = useCallback(() => addProductToCart(product), [
    addProductToCart,
    product
  ]);

  if (!product) return "Product Not Found";
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid
          item
          key={product.id}
          xs={12}
          sm={7}
          md={7}
          style={{ border: "1px solid gray", padding: 20 }}
        >
          <ProductImage
            src={
              product.imageUrl || product.imageurls
                ? product.imageurls.split(",")[0]
                : "https://source.unsplash.com/random"
            }
          />
          <Typography variant="body1">{product.description}</Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={5}
          md={5}
          justify="center"
          style={{ border: "1px solid gray", padding: 20 }}
        >
          <Grid item sm={12} md={12}>
            <Typography variant="h3">{product.name}</Typography>
            <Typography variant="h4">$ {product.price}</Typography>
            <Typography variant="h4">Free shipping</Typography>
            <QuantitySelect />
            <Button
              variant="contained"
              color="primary"
              onClick={handleOnAddProduct}
            >
              Add to Cart
            </Button>
          </Grid>
          <Grid item sm={12} md={12}>
            <Typography variant="h4">Seller Info</Typography>
            <Typography variant="body1">
              Mollit in incididunt sint nulla.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProductsDetailsPage;
