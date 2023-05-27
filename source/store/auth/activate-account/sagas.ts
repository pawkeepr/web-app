import { all, call, fork, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { activateAccountError, activateAccountSuccess } from "./actions";
import { ACTION_ACTIVATE_ACCOUNT, ActivateAccount } from './types';
//Include Both Helper File with needed methods
import { PayloadAction } from "@reduxjs/toolkit";

import {
  confirmSignUp,
} from "~/services/helpers/auth";

function* onActiveAcccount({ payload }: PayloadAction<ActivateAccount>) {
  const { username, code } = payload;
  try {
    const { data } = yield call(confirmSignUp, username, code);
    yield put(activateAccountSuccess(data));
  } catch (error) {
    yield put(activateAccountError((error as any).message));
  }
}

export function* watchProfile() {
  yield takeEvery(ACTION_ACTIVATE_ACCOUNT, onActiveAcccount);
}

function* ProfileSaga() {
  yield all([fork(watchProfile)]);
}

export default ProfileSaga;
