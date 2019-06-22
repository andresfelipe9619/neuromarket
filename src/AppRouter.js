import React from "react";
import ProductsPage from "./features/products";
import CartPage from "./features/cart";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" component={ProductsPage} exact />
        <Route path="/cart" component={CartPage} exact />
      </Switch>
    </BrowserRouter>
  );
};
export default AppRouter;
