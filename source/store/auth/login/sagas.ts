import { PayloadAction } from "@reduxjs/toolkit";
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { destroyCookie } from 'nookies';
import { call, put, takeLatest } from 'redux-saga/effects';
import cookies from '~/constants/cookies';

import {
    recoverUserByTokenFailed,
    recoverUserByTokenSuccess,
    setAuthorization,
    signInFailed,
    signInSuccess,
    signOutUserFailed,
    signOutUserSuccess,
} from './actions';

import { changeLayoutMode } from '../../layouts/actions';

import { name } from './types';

import {
    SignInCredentials,
} from '~/services/helpers/auth';

import Router from 'next/router';
import { UserData, getUser, signInAws, signOut } from '~/services/helpers/auth';

import { layoutModeTypes } from "~/Components/constants/layout";
import { getCookie, setCookie } from "~/utils/cookies-utils";
import { errorToast } from '../../helpers/toast';
import { getProfileSession, resetProfileFlag, setProfile } from '../profile/actions';
import { Profile } from "../profile/types";

export function* signInUserSaga(action: PayloadAction<SignInCredentials>) {
    try {
        const response: UserData = yield call(signInAws, action.payload);
        const { signInUserSession: { idToken } } = response;

        yield setCookie(cookies.token.name, idToken.jwtToken, idToken.payload.exp);

        const mode = getCookie(cookies.layoutMode.name);
        yield put(changeLayoutMode(mode as layoutModeTypes || layoutModeTypes.LIGHT_MODE));
        yield put(setAuthorization({ token: idToken.jwtToken }));
        yield put(signInSuccess({ user: {}, token: idToken.jwtToken }));
        yield put(getProfileSession({ email: action.payload.username }));
    } catch (error) {
        if ((error as any)?.code === 'UserNotConfirmedException') {
            yield call([Router, Router.push], '/confirm-account');

            // Se o usuário não estiver confirmado, redirecione para a página de ativação.
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
        yield put(changeLayoutMode(layoutModeTypes.LIGHT_MODE));
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