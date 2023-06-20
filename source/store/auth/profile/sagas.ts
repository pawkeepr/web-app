import { all, call, fork, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { editProfile, editProfileError, editProfileSuccess } from "./actions";
import { Profile } from './types';
//Include Both Helper File with needed methods
import { PayloadAction } from "@reduxjs/toolkit";

import {
  updateProfile
} from "~/services/helpers/profile";
import { errorToast, successToast } from "~/store/helpers/toast";

function* onUpdateProfile({ payload: user }: PayloadAction<Profile>) {
  try {
    const { data } = yield call(updateProfile, user);
    // yield call(createProfile, user)
    yield put(editProfileSuccess(data));
    successToast("Perfil atualizado com sucesso!");
  } catch (error) {
    console.log(error)
    errorToast("Erro ao atualizar perfil!");
    yield put(editProfileError((error as any).message));
  }
}

export function* watchProfile() {
  yield takeEvery(editProfile, onUpdateProfile);
}

function* ProfileSaga() {
  yield all([fork(watchProfile)]);
}

export default ProfileSaga;
