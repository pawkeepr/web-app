import { all, call, fork, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { editProfile, editProfileError, editProfileSuccess, getProfileSession } from "./actions";
import { Profile } from './types';
//Include Both Helper File with needed methods
import { PayloadAction } from "@reduxjs/toolkit";
import Router from 'next/router';

import {
    getVetProfile,
    updateProfileVet
} from "~/services/helpers";
import { errorToast, successToast } from "~/store/helpers/toast";

function* onGetProfile({ payload: user }: PayloadAction<{ email: string }>) {
    try {
        const { data } = yield call(getVetProfile);
        yield put(editProfileSuccess(data));
    } catch (error) {
        yield call([Router, Router.push], '/activation');
    }
}

function* onUpdateProfile({ payload: user }: PayloadAction<Profile>) {
    try {
        const { data } = yield call(updateProfileVet, user as any, user.id);
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

export function* watchGetProfile() {
    yield takeEvery(getProfileSession, onGetProfile);
}


function* ProfileSaga() {
    yield all([
        fork(watchProfile),
        fork(watchGetProfile),
    ]);
}

export default ProfileSaga;
