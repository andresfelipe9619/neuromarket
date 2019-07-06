import React from "react";
import CartPage from "./features/cart";
import HomePage from "./features/home";
import LoginPage from "./features/login";
import CheckoutPage from "./features/checkout";
import ProductsPage from "./features/products";
import RegisterPage from "./features/register";
import Navbar from "./components/navbar/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/cart" component={CartPage} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <Route path="/checkout" component={CheckoutPage} exact />
          <Route path="/products" component={ProductsPage} exact />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};
export default AppRouter;
