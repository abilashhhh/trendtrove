import {configureStore} from '@reduxjs/toolkit'

import authReducer from '../UserAuthSlice/authSlice'
import adminReducer from '../AdminSlice/adminSlice'

const store = configureStore({
    reducer : {
        userAuth : authReducer,
        admin: adminReducer,
    }
})

export default store
export type StoreType  = ReturnType<typeof store.getState>