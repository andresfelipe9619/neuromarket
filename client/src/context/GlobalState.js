import React, { useState, useReducer } from "react";
import ShopContext, { initialState as initialShop } from "./shop-context";
import {
  shopReducer,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  LOOKING_FOR
} from "./reducers";
import { IntlProviderWrapper } from "./intl-context";
import AlertContext, { initialState as initialAlert } from "./alert-context";

export default function GlobalState(props) {
  const [shopState, dispatch] = useReducer(shopReducer, initialShop);
  const [alertState, setAlert] = useState(initialAlert);

  const openAlert = ({ message, variant }) => {
    setAlert({ ...alertState, open: true, message, variant });
  };

  const closeAlert = () => {
    setAlert({ ...alertState, open: false, message: "" });
  };

  const addProductToCart = product => {
    dispatch({ type: ADD_PRODUCT, product: product });
  };

  const removeProductFromCart = productId => {
    dispatch({ type: REMOVE_PRODUCT, productId: productId });
  };

  const addProductToFavorites = product => {
    dispatch({ type: ADD_FAVORITE, product: product });
  };

  const removeProductFromFavorites = productId => {
    dispatch({ type: REMOVE_FAVORITE, productId: productId });
  };

  const lookForProduct = product => {
    dispatch({ type: LOOKING_FOR, product: product });
  };

  return (
    <IntlProviderWrapper>
      <AlertContext.Provider
        value={{
          open: alertState.open,
          message: alertState.message,
          variant: alertState.variant,
          closeAlert,
          openAlert
        }}
      >
        <ShopContext.Provider
          value={{
            cart: shopState.cart,
            products: shopState.products,
            favorites: shopState.favorites,
            productsFound: shopState.productsFound,
            addProductToCart,
            lookForProduct,
            removeProductFromCart,
            addProductToFavorites,
            removeProductFromFavorites
          }}
        >
          {props.children}
        </ShopContext.Provider>
      </AlertContext.Provider>
    </IntlProviderWrapper>
  );
}
