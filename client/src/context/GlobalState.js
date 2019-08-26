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
import UserContext, { initialUserState as initialUser } from "./user-context";

export default function GlobalState(props) {
  const [shopState, dispatch] = useReducer(shopReducer, initialShop);
  const [alertState, setAlert] = useState(initialAlert);
  const [userState, setUserState] = useState(initialUser);

  const userLoggedIn = user => {
    setUserState({
      ...userState,
      loggedIn: true,
      name: user.name,
      email: user.email,
      img: user.img,
      phone: user.phone
    });
  };

  const userLoggedOut = () => {
    setUserState({
      ...userState,
      loggedIn: false,
      name: "",
      email: "",
      img: ""
    });
  };

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
        <UserContext.Provider
          value={{
            loggedIn: userState.loggedIn,
            name: userState.name,
            email: userState.email,
            img: userState.img,
            phone: userState.phone,
            userLoggedIn,
            userLoggedOut
          }}
        >
          <ShopContext.Provider
            value={{
              cart: shopState.cart,
              subtotal: shopState.subtotal,
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
        </UserContext.Provider>
      </AlertContext.Provider>
    </IntlProviderWrapper>
  );
}
