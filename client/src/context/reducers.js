export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const LOOKING_FOR = "LOOKING_FOR";

const getSubtotal = cart =>
  cart
    .reduce((subtotal, { price, quantity }) => {
      let ammount = price * quantity;
      return ammount + subtotal;
    }, 0)
    .toFixed(2);

const addProductToCart = (product, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    item => item._id === product._id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity++;
    updatedItem.ammount = (updatedItem.quantity * updatedItem.price).toFixed(2);
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart, subtotal: getSubtotal(updatedCart) };
};

const removeProductFromCart = (productId, state) => {
  console.log("Removing product with id: " + productId);
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    item => item._id === productId
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex]
  };
  updatedItem.quantity--;
  updatedItem.ammount = (updatedItem.quantity * updatedItem.price).toFixed(2);
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cart: updatedCart, subtotal: getSubtotal(updatedCart) };
};

const addProductToFavorites = (product, state) => {
  const updatedFavorites = [...state.favorites];
  const updatedItemIndex = updatedFavorites.findIndex(
    item => item._id === product._id
  );

  if (updatedItemIndex < 0) {
    updatedFavorites.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedFavorites[updatedItemIndex]
    };
    updatedItem.quantity++;
    updatedFavorites[updatedItemIndex] = updatedItem;
  }
  return { ...state, favorites: updatedFavorites };
};

const removeProductFromFavorites = (productId, state) => {
  console.log("Removing product with id: " + productId);
  const updatedFavorites = [...state.favorites];
  const updatedItemIndex = updatedFavorites.findIndex(
    item => item._id === productId
  );

  const updatedItem = {
    ...updatedFavorites[updatedItemIndex]
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedFavorites.splice(updatedItemIndex, 1);
  } else {
    updatedFavorites[updatedItemIndex] = updatedItem;
  }
  return { ...state, favorites: updatedFavorites };
};

const lookForProduct = (prodocutobusqueda, state) => {
  const prodocutobusquedareducer = prodocutobusqueda;
  console.log("productosencotrados", { prodocutobusquedareducer, state });
  return { ...state, productsFound: prodocutobusquedareducer };
};

export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);
    case ADD_FAVORITE:
      return addProductToFavorites(action.product, state);
    case REMOVE_FAVORITE:
      return removeProductFromFavorites(action.productId, state);
    case LOOKING_FOR:
      return lookForProduct(action.product, state);
    default:
      return state;
  }
};
