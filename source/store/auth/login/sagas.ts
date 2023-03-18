import { PayloadAction } from "@reduxjs/toolkit";
import { destroyCookie, setCookie } from 'nookies';
import { call, put, takeLatest } from 'redux-saga/effects';
import cookies from '~/constants/cookies';

import {
    recoverUserByTokenFailed,
    recoverUserByTokenSuccess,
    signInFailed,
    signInSuccess,
    signOutUserFailed,
    signOutUserSuccess,
} from './actions';

import { name } from './types';

import {
    SignInCredentials,
} from '~/services/helpers/auth';

import { getUser, postJwtLogin } from '~/helpers/fakebackend_helper';

export function* signInUserSaga(action: PayloadAction<SignInCredentials>) {
    try {
        const { data: token } = yield call(postJwtLogin, action.payload);
        const { data: user } = yield call(getUser, token.access_token);
        yield setCookie(undefined, cookies.token.name, token.access_token, {
            maxAge: cookies.token.expires,
        });
        yield put(signInSuccess({ user, ...token }));
    } catch (error) {
        console.log(error)
        yield put(signInFailed((error as any).message));
    }
}

export function* recoverUserByTokenSaga(action: PayloadAction<string>) {
    try {
        const { data: user } = yield call(getUser, action.payload);
        const access_token = action.payload;

        yield put(recoverUserByTokenSuccess({ user, access_token }));
    } catch (error) {
        console.log(error)
        yield put(recoverUserByTokenFailed((error as any).message));
    }
}

export function* signOutUserSaga() {
    try {
        yield destroyCookie(null, cookies.token.name);
        yield put(signOutUserSuccess());
    } catch (error) {
        console.log(error)
        yield put(signOutUserFailed((error as any).message));
    }
}

export function* LoginSaga() {
    yield takeLatest(`${name}/signInUser`, signInUserSaga);
    yield takeLatest(`${name}/recoverUserByToken`, recoverUserByTokenSaga);
    yield takeLatest(`${name}/signOutUser`, signOutUserSaga);
}


export default LoginSaga;