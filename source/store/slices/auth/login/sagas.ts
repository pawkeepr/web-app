import { PayloadAction } from "@reduxjs/toolkit";
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import cookies from '~/constants/cookies';

import {
    recoverUserByTokenFailed,
    recoverUserByTokenSuccess,
    setAuthorization,
    signInFailed,
    signInSuccess,
    signOutUserFailed,
    signOutUserSuccess
} from './actions';

import { changeLayoutMode } from '../../layouts/actions';

import { name } from './types';

import Router from 'next/router';
import { SignInCredentials, UserData, getUser, signInAws, signOut } from '~/services/helpers/auth';

import { layoutModeTypes } from "~/Components/constants/layout";
import { errorToast } from '~/store/helpers/toast';
import { getCookie, removeCookie, setCookie } from "~/utils/cookies-utils";
import { getProfileSession, resetProfileFlag, setProfile } from '../profile/actions';
import { Profile } from "../profile/types";

import { setEmailAccount, setPasswordAccount } from '../activate-account/actions';

export function* signInUserSaga(action: PayloadAction<SignInCredentials>) {
    try {
        const response: UserData = yield call(signInAws, action.payload);
        const { signInUserSession: { idToken } } = response;
        const now = new Date().getTime()
        const time = idToken.payload.exp - now
        console.log(idToken)

        yield setCookie(cookies.token.name, idToken.jwtToken,);

        const mode = getCookie(cookies.layoutMode.name) || layoutModeTypes.LIGHT_MODE
        const token = idToken.jwtToken

        yield put(changeLayoutMode(mode));
        yield put(setAuthorization({ token }));
        yield put(signInSuccess({ token }));
        yield put(getProfileSession());

    } catch (error) {
        switch ((error as any)?.code) {
            case 'UserNotConfirmedException':
                yield put(setEmailAccount(action.payload.username));
                yield put(setPasswordAccount(action.payload.password));
                yield call([Router, Router.push], '/confirm-account');
                yield put(signInFailed((error as any).message));
                break;
            default:
                errorToast('Não foi possível realizar o login.', 'Falha!')
                yield put(signInFailed((error as any).message));
                break;
        }
    }
}

export function* recoverUserByTokenSaga() {
    try {
        const session: CognitoUserSession = yield call(getUser);
        // token expirou
        if (session.getIdToken().getExpiration() < new Date().getTime()) {
            throw new Error('Token expirado');
        }

        const access_token = session.getAccessToken().getJwtToken();
        const userData = session.getIdToken().payload;
        yield put(setProfile(userData as Profile));
        yield put(recoverUserByTokenSuccess({ access_token }));
    } catch (error) {

        yield put(signOutUserSuccess());
        yield put(recoverUserByTokenFailed((error as any).message));
        delay(1000);
        yield call([Router, Router.push], '/sign-in');
    }
}

export function* signOutUserSaga() {
    try {
        yield put(changeLayoutMode(layoutModeTypes.LIGHT_MODE));
        yield removeCookie(cookies.token.name);
        yield put(resetProfileFlag());
        yield put(signOutUserSuccess());
        yield call(signOut);
    } catch (error) {
        if ((error as string) === 'No current user') {
            yield put(signOutUserSuccess());
            return;
        }
        yield put(signOutUserFailed((error as any).message));
    } finally {
        delay(1000);
        yield call([Router, Router.push], '/sign-in');
    }
}


export function* LoginSaga() {
    yield takeLatest(`${name}/signInUser`, signInUserSaga);
    yield takeLatest(`${name}/recoverUserByToken`, recoverUserByTokenSaga);
    yield takeLatest(`${name}/signOutUser`, signOutUserSaga);
}


export default LoginSaga;