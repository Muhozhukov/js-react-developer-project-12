/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {() => (props.loggedIn ? <Component {...props} /> : <Navigate to="./login" />)}
  </Route>
);

export default ProtectedRoute;
