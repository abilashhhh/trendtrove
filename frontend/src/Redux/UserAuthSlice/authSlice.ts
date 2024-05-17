// import { createSlice } from "@reduxjs/toolkit";

// import { User } from "../../Types/signInUser";

// interface AuthState{
//     user : User | null;
//     accessToken :  string | null;
//     isAuthenticated ?: boolean
// }

// const initialState : AuthState ={
//     user : null,
//      isAuthenticated : false, 
//      accessToken : null
// }

// const authSlice = createSlice({
//     name :'auth',
//     initialState,
//     reducers : {
//         setCredentials : (state , action) => {
//             const {user, accessToken } : AuthState = action.payload;
//             state.user = user;
//             state.accessToken = accessToken
//             state.isAuthenticated = true
//         },
//         logout :(state) => {
//             state.isAuthenticated = false;
//             state.user = null
//             state.accessToken = null
//         }
//     }
// })

// export const {setCredentials, logout} = authSlice.actions;
// export default authSlice.reducer


// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../Types/signInUser";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken }: AuthState = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
