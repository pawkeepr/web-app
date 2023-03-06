import { PayloadAction } from "@reduxjs/toolkit";
import { setCookie } from 'nookies';
import { call, put, takeLatest } from 'redux-saga/effects';
import cookies from '~/constants/cookies';
import {
    recoverUserByTokenFailed,
    recoverUserByTokenSuccess,
    signInFailed,
    signInSuccess,
} from './actions';

import { SignInCredentials, getUser, postJwtLogin } from '~/services/helpers/auth';

export function* signInUserSaga(action: PayloadAction<SignInCredentials>) {
    try {
        const { data: token } = yield call(postJwtLogin, action.payload);
        const { data: user } = yield call(getUser, token.access_token);

        yield put(signInSuccess({ user, token }));
        yield setCookie(undefined, cookies.token.name, token.access_token, {
            maxAge: cookies.token.expires,
        });
    } catch (error) {
        yield put(signInFailed((error as any).message));
    }
}

export function* recoverUserByTokenSaga(action: PayloadAction<string>) {
    try {
        const { data: user } = yield call(getUser, action.payload);
        const access_token = action.payload;

        yield put(recoverUserByTokenSuccess({ user, access_token }));
    } catch (error) {
        yield put(recoverUserByTokenFailed((error as any).message));
    }
}

export function* watchAuth() {
    yield takeLatest('login/signInUser', signInUserSaga);
    yield takeLatest('login/recoverUserByToken', recoverUserByTokenSaga);
}
