import React from "react";
import GlobalState from "./context/GlobalState";
import ProductsPage from "./features/products";
import CartPage from "./features/cart";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <GlobalState>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ProductsPage} exact />
          <Route path="/cart" component={CartPage} exact />
        </Switch>
      </BrowserRouter>
    </GlobalState>
  );
};

export default App;
