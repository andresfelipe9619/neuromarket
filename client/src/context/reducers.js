export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const LOOKING_FOR="LOOKING_FOR"

const addProductToCart = (product, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    item => item.id === product.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productId, state) => {
  console.log("Removing product with id: " + productId);
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(item => item.id === productId);

  const updatedItem = {
    ...updatedCart[updatedItemIndex]
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const addProductToFavorites = (product, state) => {
  const updatedFavorites = [...state.favorites];
  const updatedItemIndex = updatedFavorites.findIndex(
    item => item.id === product.id
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
    item => item.id === productId
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

 const lookForProduct = (prodocutobusqueda,state)=> {
      const busquedanormalizada = prodocutobusqueda.toLowerCase()
      const arreglo = [];
      state.products.map(product=>{
          const productonormalizado= product.title.toLowerCase()
          if(productonormalizado.includes(busquedanormalizada)){
            console.log("entontrado");
            arreglo.push(product)
            
          }
        })
    return{...state,productsFound:arreglo};
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
      return lookForProduct(action.product,state);
    default:
      return state;
  }
};
