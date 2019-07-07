import React, { useState, useReducer } from "react";
import ShopContext, { initialState as initialShop } from "./shop-context";
import {
  shopReducer,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from "./reducers";
import { IntlProviderWrapper } from "./intl-context";
import AlertContext, { initialState as initialAlert } from "./alert-context";
const GlobalState = props => {
  const [shopState, dispatch] = useReducer(shopReducer, initialShop);
  const [alertState, setAlert] = useState(initialAlert);
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

  return (
    <IntlProviderWrapper>
      <AlertContext.Provider
        value={{
          open: alertState.open,
          message: alertState.message,
          variant: alertState.variant,
          setAlert
        }}
      >
        <ShopContext.Provider
          value={{
            cart: shopState.cart,
            products: shopState.products,
            favorites: shopState.favorites,
            addProductToCart,
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
};

export default GlobalState;
