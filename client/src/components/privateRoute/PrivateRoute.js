import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from '../../context/user-context';

const PrivateRoute = ({ component: Component, restricted, ...rest }) => {
  const user = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={props =>
        user.loggedIn  && restricted ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    />
  );
};

export default PrivateRoute;
