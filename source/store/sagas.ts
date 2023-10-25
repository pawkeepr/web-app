import { all, fork } from "redux-saga/effects";
//layout
import LoginSagas from "./slices/auth/login/sagas";
import LayoutSaga from "./slices/layouts/saga";
//Auth
import ActivateAccountSaga from "./slices/auth/activate-account/sagas";
import ForgetSaga from "./slices/auth/forget-pwd/sagas";
import ProfileSaga from "./slices/auth/profile/sagas";
import AccountSaga from "./slices/auth/register/sagas";

import AppointmentVetSagas from './slices/appointment-vet/sagas';
import schedule from './slices/newSchedule/sagas';
import PetsSagas from './slices/pets/sagas';
import TutorsSagas from './slices/tutors/sagas';


export default function* rootSaga() {
    yield all([
        //public
        fork(LayoutSaga),
        fork(AccountSaga),
        fork(ForgetSaga),
        fork(ProfileSaga),
        fork(ActivateAccountSaga),
        fork(TutorsSagas),
        fork(PetsSagas),
        fork(AppointmentVetSagas),
        fork(LoginSagas),
        fork(schedule),
    ]);
}
