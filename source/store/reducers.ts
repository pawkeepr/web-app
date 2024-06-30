import { combineReducers } from '@reduxjs/toolkit'

import { persistReducer } from 'redux-persist'
import storage from './storage'

// Front
import Layout from './slices/layouts/slice'

// Authentication
import ActivateAccount from './slices/auth/activate-account/slice'
import ForgetPassword from './slices/auth/forget-pwd/slice'
import Login from './slices/auth/login/slice'
import Account from './slices/auth/register/slice'

const persistConfig = {
    key: '@pawkeepr/session',
    storage,
}

const persistedReducersSession = persistReducer(persistConfig, Login)

const rootReducer = combineReducers({
    // public
    Layout,
    Login: persistedReducersSession,
    Account,
    ForgetPassword,
    ActivateAccount,
})

export default rootReducer
