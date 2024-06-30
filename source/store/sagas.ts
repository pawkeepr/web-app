import { all, fork } from 'redux-saga/effects'
//Auth
import ActivateAccountSaga from './slices/auth/activate-account/sagas'
import ForgetSaga from './slices/auth/forget-pwd/sagas'
//layout
import LoginSagas from './slices/auth/login/sagas'
import AccountSaga from './slices/auth/register/sagas'
import LayoutSaga from './slices/layouts/saga'

export default function* rootSaga() {
    yield all([
        //public
        fork(LayoutSaga),
        fork(AccountSaga),
        fork(ForgetSaga),
        fork(ActivateAccountSaga),
        fork(LoginSagas),
    ])
}
