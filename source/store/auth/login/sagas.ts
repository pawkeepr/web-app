import { PayloadAction } from "@reduxjs/toolkit";
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import Router from 'next/router';
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

import { UserData, getUser, signInAws, signOut } from '~/services/helpers/auth';

import { errorToast } from '../../helpers/toast';
import { resetProfileFlag, setProfile } from '../profile/actions';
import { Profile } from "../profile/types";

export function* signInUserSaga(action: PayloadAction<SignInCredentials>) {
    try {
        const response: UserData = yield call(signInAws, action.payload);
        const { signInUserSession: { accessToken } } = response;
        // token
        // const { data: user } = yield call(getUser, accessToken.jwtToken);
        yield setCookie(undefined, cookies.token.name, accessToken.jwtToken, {
            maxAge: accessToken.payload.exp,
        });
        // yield put(setProfile(user));
        yield put(signInSuccess({ user: {}, token: accessToken.jwtToken }));
    } catch (error) {
        if ((error as any)?.code === 'UserNotConfirmedException') {
            // Se o usuário não estiver confirmado, redirecione para a página de ativação.
            yield call([Router, Router.push], '/activation');
            yield put(signInFailed((error as any).message));
        } else {
            errorToast('Não foi possível realizar o login.', 'Falha!')
            yield put(signInFailed((error as any).message));
        }
    }
}

export function* recoverUserByTokenSaga() {
    try {
        const session: CognitoUserSession = yield call(getUser);
        const access_token = session.getAccessToken().getJwtToken();
        const userData = session.getIdToken().payload;
        yield put(setProfile(userData as Profile));
        yield put(recoverUserByTokenSuccess({ user: userData, access_token }));
    } catch (error) {
        console.log(error)
        yield put(recoverUserByTokenFailed((error as any).message));
    }
}

export function* signOutUserSaga() {
    try {
        yield destroyCookie(null, cookies.token.name);
        yield put(resetProfileFlag());
        yield put(signOutUserSuccess());
        yield call(signOut);
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