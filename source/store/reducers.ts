import { combineReducers } from "@reduxjs/toolkit";

import { persistReducer } from 'redux-persist';
import storage from './storage';

// Front
import Layout from "./layouts/slice";

// Authentication
import ActivateAccount from './auth/activate-account/slice';
import ForgetPassword from "./auth/forget-pwd/slice";
import Login from "./auth/login/slice";
import Profile from "./auth/profile/slice";
import Account from "./auth/register/slice";

//Calendar
import Calendar from "./calendar/reducer";
//Chat
import chat from "./chat/reducer";

// Tasks
import Tasks from "./tasks/reducer";

//Tutor
import Tutor from "./tutors/slice";

// Pets
import Pets from "./pets/slice";

import AppointmentVet from "./appointment-vet/slice";

// Pages > Team
import Team from "./team/reducer";

// schedule
import schedule from "./newSchedule/slice";


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
    Calendar,
    chat,
    Tasks,
    Tutor,
    Team,
    Pets,
    schedule,
    ActivateAccount,
});

export default rootReducer;