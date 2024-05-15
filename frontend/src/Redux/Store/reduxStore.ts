import {configureStore} from '@reduxjs/toolkit'

import authReducer from '../UserAuthSlice/authSlice'

const store = configureStore({
    reducer : {
        userAuth : authReducer
    }
})

export default store
export type StoreType  = ReturnType<typeof store.getState>