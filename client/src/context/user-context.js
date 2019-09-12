import React from "react";

const initialUserState = {
  _id: "",
  name: "",
  email: "",
  img: "",
  phone: 0,
  loggedIn: false
};
export { initialUserState };
export default React.createContext();
