import { all, call, delay, fork, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import {
    addFail,
    addSuccess,
    editProfileError,
    editProfileSuccess,
} from "./actions";
import {
    ACTION_ADD_NEW,
    ACTION_EDIT_PROFILE,
    ACTION_GET_PROFILE_SESSION,
    Profile
} from './types';
//Include Both Helper File with needed methods
import { PayloadAction } from "@reduxjs/toolkit";
import Router from 'next/router';

import {
    createProfileVet,
    getVetProfile,
    updateProfileVet
} from "~/services/helpers";
import { errorToast, successToast } from "~/store/helpers/toast";

function* onGetProfile() {
    try {
        const { data } = yield call(getVetProfile);
        yield put(editProfileSuccess(data));
    } catch (error) {
        yield call([Router, Router.push], '/activation');
    }
}


function* onAddProfile({ payload: profile }: PayloadAction<Profile>) {
    try {
        const { data } = yield call(createProfileVet, profile);
        yield delay(1000);
        yield put(addSuccess(data));
        successToast("Perfil ativado com sucesso!");
        yield call([Router, Router.push], '/dashboard');
    } catch (error) {
        errorToast("Erro ao ativar perfil!");
        yield put(addFail((error as any).message));
    }
}

function* onUpdateProfile({ payload: user }: PayloadAction<Profile>) {
    try {
        const { data } = yield call(updateProfileVet, user, user.id as string);
        // yield call(createProfile, user)
        yield put(editProfileSuccess(data));
        successToast("Perfil atualizado com sucesso!");
    } catch (error) {
        console.log(error)
        errorToast("Erro ao atualizar perfil!");
        yield put(editProfileError((error as any).message));
    }
}

export function* watchUpdateProfile() {
    yield takeEvery(ACTION_EDIT_PROFILE, onUpdateProfile);
}

export function* watchGetProfile() {
    yield takeEvery(ACTION_GET_PROFILE_SESSION, onGetProfile);
}

export function* watchAddProfile() {
    yield takeEvery(ACTION_ADD_NEW, onAddProfile);
}


function* ProfileSaga() {
    yield all([
        fork(watchUpdateProfile),
        fork(watchGetProfile),
        fork(watchAddProfile),
    ]);
}

export default ProfileSaga;
