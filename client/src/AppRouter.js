import React, { useContext } from "react";
import CartPage from "./features/cart";
import HomePage from "./features/home";
import LoginPage from "./features/login";
import CheckoutPage from "./features/checkout";
import { ProductsPage, ProductsDetailsPage,ProductsFound } from "./features/products";
import RegisterPage from "./features/register";
import Navbar from "./components/navbar/Navbar";
import Alert from "./components/alert/Alert";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AlertContext from "./context/alert-context";

// Dashboard features

import Dashboard from './features/Dashboard';
import ProductList from './features/AdminProductList';
import UserList from './features/UserList';
import Typography from './features/Typography';
import Icons from './features/Icons';
import Account from './features/Account';
import Settings from './features/Settings';
import SignUp from './features/SignUp';
import SignIn from './features/SignIn';
import UnderDevelopment from './features/UnderDevelopment';
import NotFound from './features/NotFound';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

export default function AppRouter() {
  const { open, message, variant, closeAlert } = useContext(AlertContext);
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <Alert
          open={open}
          message={message}
          variant={variant}
          handleClose={closeAlert}
        />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/cart" component={CartPage} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <Route path="/checkout" component={CheckoutPage} exact />
          <Route path="/products" component={ProductsPage} exact />
          <Route path="/products/:id" component={ProductsDetailsPage} exact />
          <Route path="/busqueda" component={ProductsFound} exact />

          {/* Dashboard Routes*/}
          <Route component={Dashboard} exact path="/dashboard" />
          <Route component={UserList} exact path="/dashboard/users" />
          <Route component={ProductList} exact path="/dashboard/products" />
          <Route component={Typography} exact path="/dashboard/typography" />
          <Route component={Icons} exact path="/dashboard/icons" />
          <Route component={Account} exact path="/account" />
          <Route component={Settings} exact path="/dashboard/settings" />
          <Route component={SignUp} exact path="/sign-up" />
          <Route component={SignIn} exact path="/sign-in" />
          <Route component={UnderDevelopment} exact path="/under-development" />
          <Route component={NotFound} exact path="/not-found" />
          <Redirect to="/not-found" />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
