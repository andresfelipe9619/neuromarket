import React, { useReducer } from "react";

import ShopContext, { initialState } from "./shop-context";
import {
  shopReducer,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from "./reducers";
import { IntlProviderWrapper } from "./intl-context";

const GlobalState = props => {
  const [shopState, dispatch] = useReducer(shopReducer, initialState);

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
    </IntlProviderWrapper>
  );
};

export default GlobalState;
