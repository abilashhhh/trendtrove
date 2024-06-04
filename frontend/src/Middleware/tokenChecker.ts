
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../Redux/Store/reduxStore"
import { getUserInfo2 } from "../API/Profile/profile"
import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/UserAuthSlice/authSlice";

interface TokenCheckMiddlewareProps {
  children: React.JSX.Element;
}

const TokenCheckMiddleware = ({
  children
}: TokenCheckMiddlewareProps): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const { accessToken } = store.getState().userAuth;
    if (accessToken) {
      navigate("/home");
    }
    else{

      const fetchUser = async () => {
        const { user } = await getUserInfo2();
        console.log("User from the fetch user in token checker middleware : " , user)
        dispatch(setCredentials({ user }));
        return user
      }

      fetchUser().then((user) => (
        user ? navigate("/home") : ""
      ))
    }
  }, [dispatch, navigate]);

  return children;
};

export default TokenCheckMiddleware;

// import React, { useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import { setCredentials } from "../Redux/UserAuthSlice/authSlice"
// import { getUserInfo } from "../API/Profile/profile"

// interface TokenCheckMiddlewareProps {
//   children: React.JSX.Element
// }

// const TokenCheckMiddleware = ({
//   children
// }: TokenCheckMiddlewareProps): React.JSX.Element => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   useEffect(() => {
//     const checkToken = async () => {
//       try {
//         const userInfo = await getUserInfo()
//         dispatch(setCredentials(userInfo))
//         navigate('/home')
//       } catch (error) {
//         console.error('Error checking token:', error)
//         navigate('/signin')
//       }
//     }
//     checkToken()
//   }, [dispatch, navigate])

//   return children
// }

// export default TokenCheckMiddleware

