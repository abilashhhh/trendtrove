 
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StoreType } from './Redux/Store/reduxStore'

interface PrivateRouteProps {
  element: React.ReactElement
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const currentUSer = useSelector((state: StoreType) => state.userAuth.isAuthenticated)
  return currentUSer ? element: <Navigate to="/signin" />
}

export default PrivateRoute