import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

//Account Redux states
import { registerUser, registerUserFailed, registerUserSuccessful } from "./actions";

//Include Both Helper File with needed methods
import {
  singUpAws
} from "~/services/helpers/auth";

import { AccountSignUp } from './types';

// Is user register successful then direct plot user in redux.
function* registerUserSaga({ payload: user }: PayloadAction<AccountSignUp>) {
  try {
    yield call(singUpAws, user);
    yield put(registerUserSuccessful());
  } catch (error) {
    yield put(registerUserFailed(error as string));
  }
}

export function* watchUserRegister() {
  yield takeEvery(registerUser, registerUserSaga);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
