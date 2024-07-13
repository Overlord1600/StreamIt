import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, render, ...rest }) => {
  const { isAuth } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          Component ? <Component {...props} /> : render(props)
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default PrivateRoute;
