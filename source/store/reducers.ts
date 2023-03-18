import { combineReducers } from "@reduxjs/toolkit";

// Front
import Layout from "./layouts/slice";

// Authentication
import ForgetPassword from "./auth/forgetpwd/reducer";
import Login from "./auth/login/slice";
import Profile from "./auth/profile/reducer";
import Account from "./auth/register/slice";

//Calendar
import Calendar from "./calendar/reducer";
//Chat
import chat from "./chat/reducer";

// Tasks
import Tasks from "./tasks/reducer";

//Crm
import Crm from "./tutor/reducer";

// Pages > Team
import Team from "./team/reducer";


const rootReducer = combineReducers({
    // public
    Layout,
    Login,
    Account,
    ForgetPassword,
    Profile,
    Calendar,
    chat,
    Tasks,
    Crm,
    Team,
});

export default rootReducer;