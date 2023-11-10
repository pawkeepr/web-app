import { combineReducers } from "@reduxjs/toolkit";

import { persistReducer } from 'redux-persist';
import storage from './storage';

// Front
import Layout from "./slices/layouts/slice";

// Authentication
import ActivateAccount from './slices/auth/activate-account/slice';
import ForgetPassword from "./slices/auth/forget-pwd/slice";
import Login from "./slices/auth/login/slice";
import Profile from "./slices/auth/profile/slice";
import Account from "./slices/auth/register/slice";

//Tutor
import Tutor from "./slices/tutors/slice";

// Pets
import Pets from "./slices/pets/slice";

import AppointmentVet from "./slices/appointment-vet/slice";

// schedule
import schedule from "./slices/newSchedule/slice";

import scheduled from "./slices/scheduled/slice";

const persistConfig = {
    key: '@pawkeepr/session',
    storage,
}

const persistedReducersSession = persistReducer(
    persistConfig,
    Login
)

const rootReducer = combineReducers({
    // public
    Layout,
    Login: persistedReducersSession,
    Account,
    ForgetPassword,
    AppointmentVet,
    Profile,
    Tutor,
    Pets,
    schedule,
    scheduled,
    ActivateAccount,
});

export default rootReducer;