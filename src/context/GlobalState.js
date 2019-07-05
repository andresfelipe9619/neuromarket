import React, { useReducer } from "react";

import ShopContext from "./shop-context";
import {
  shopReducer,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from "./reducers";
import { IntlProviderWrapper } from "./intl-context";

const GlobalState = props => {
  const products = [
    { id: "p1", title: "Gaming Mouse", price: 29.99 },
    { id: "p2", title: "Harry Potter 3", price: 9.99 },
    { id: "p3", title: "Used plastic bottle", price: 0.99 },
    { id: "p4", title: "Half-dried plant", price: 2.99 }
  ];
  const [shopState, dispatch] = useReducer(shopReducer, {
    cart: [],
    favorites: []
  });

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
      <ShopContext.Provider
        value={{
          products: products,
          cart: shopState.cart,
          favorites: shopState.favorites,
          addProductToCart,
          removeProductFromCart,
          addProductToFavorites,
          removeProductFromFavorites
        }}
      >
        {props.children}
      </ShopContext.Provider>
    </IntlProviderWrapper>
  );
};

export default GlobalState;
