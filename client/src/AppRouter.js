import React, { useContext } from "react";
import CartPage from "./features/cart";
import HomePage from "./features/home";
import CheckoutPage from "./features/checkout";
import FavoritesPage from "./features/favorites";
import Navbar from "./components/navbar/Navbar";
import Alert from "./components/alert/Alert";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AlertContext from "./context/alert-context";
import Dashboard from "./features/Dashboard";
import ProductList from "./features/AdminProductList";
import Soldproducts from "./features/Soldproducts";
import SaleProducts from "./features/SaleProducts";
import Icons from "./features/Icons";
import Account from "./features/Account";
import Settings from "./features/Settings";
import SignUp from "./features/SignUp";
import SignIn from "./features/SignIn";
import UnderDevelopment from "./features/UnderDevelopment";
import NotFound from "./features/NotFound";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import {
  ProductsPage,
  ProductsDetailsPage,
  ProductsFound
} from "./features/products";

export default function AppRouter() {
  const { open, message, variant, closeAlert } = useContext(AlertContext);
  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <Route path="/dashboard" component={null} />
        <Route path="/" component={Navbar} />
      </Switch>

      {/* <Navbar/> */}
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
          <Route path="/sign-up" component={SignUp} exact />
          <Route path="/sign-in" component={SignIn} exact />
          <Route path="/checkout" component={CheckoutPage} exact />
          <Route path="/category/:id" component={ProductsPage} exact />
          <Route path="/favorites" component={FavoritesPage} exact />
          <Route path="/products/:id" component={ProductsDetailsPage} exact />
          <Route path="/busqueda" component={ProductsFound} exact />
          <PrivateRoute
            restricted={true}
            component={Dashboard}
            exact
            path="/dashboard"
          />
          <PrivateRoute
            restricted={true}
            component={ProductList}
            exact
            path="/dashboard/products"
          />
          <PrivateRoute
            restricted={true}
            component={Icons}
            exact
            path="/dashboard/icons"
          />
          <PrivateRoute
            restricted={true}
            component={Account}
            exact
            path="/dashboard/account"
          />
          <PrivateRoute
            restricted={true}
            component={Settings}
            exact
            path="/dashboard/settings"
          />
          <PrivateRoute
            component={Soldproducts}
            exact
            path="/dashboard/soldproducts"
          />
          <PrivateRoute
            component={SaleProducts}
            exact
            path="/dashboard/SaleProducts"
          />
          <Route component={UnderDevelopment} exact path="/under-development" />
          <Route component={NotFound} exact path="/not-found" />
          <Redirect to="/not-found" />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
