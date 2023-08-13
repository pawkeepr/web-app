import { combineReducers } from "@reduxjs/toolkit";

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


const rootReducer = combineReducers({
    // public
    Layout,
    Login,
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
    ActivateAccount,
});

export default rootReducer;