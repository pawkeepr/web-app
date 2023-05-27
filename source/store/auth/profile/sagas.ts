import { all, call, fork, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { editProfile as editProfileAction, profileError, profileSuccess } from "./actions";
import { Profile } from './types';
//Include Both Helper File with needed methods
import { PayloadAction } from "@reduxjs/toolkit";

import {
  updateProfile,
} from "~/services/helpers/profile";

function* onUpdateProfile({ payload: user }: PayloadAction<Profile>) {
  try {
    const { data } = yield call(updateProfile, user);
    yield put(profileSuccess(data));
  } catch (error) {
    yield put(profileError((error as any).message));
  }
}

export function* watchProfile() {
  yield takeEvery(editProfileAction, onUpdateProfile);
}

function* ProfileSaga() {
  yield all([fork(watchProfile)]);
}

export default ProfileSaga;
