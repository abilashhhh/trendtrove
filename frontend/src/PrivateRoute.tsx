import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StoreType } from './Redux/Store/reduxStore'

interface PrivateRouteProps {
  element: React.ReactElement
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const currentUser = useSelector((state: StoreType) => state.userAuth.isAuthenticated);
  const currentAdmin = useSelector((state: StoreType) => state.admin.isAuthenticated);

  if (currentUser) {
    return element;  
  } else if (currentAdmin) {
    return element;  
  } else {
    return <Navigate to="/" />;  
  }
}

export default PrivateRoute