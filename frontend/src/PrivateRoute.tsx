// PrivateRoute.tsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreType } from './Redux/Store/reduxStore';

interface PrivateRouteProps {
  element: React.ReactElement;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = useSelector((state: StoreType) => state.userAuth.isAuthenticated);

  return isAuthenticated ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;
