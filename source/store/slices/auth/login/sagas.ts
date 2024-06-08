import type { PayloadAction } from '@reduxjs/toolkit'
import type { CognitoUserSession } from 'amazon-cognito-identity-js'
import { call, delay, put, takeLatest } from 'redux-saga/effects'
import cookies from '~/constants/cookies'

import {
    resetLoading,
    setAuthorization,
    signInFailed,
    signInSuccess,
    signOutUser,
    signOutUserFailed,
    signOutUserSuccess,
} from './actions'

import { changeLayoutMode } from '../../layouts/actions'

import { name } from './types'

import Router from 'next/router'
import {
    getUser,
    signInAws,
    signOut,
    type SignInCredentials,
    type UserData,
} from '~/services/helpers/auth'

import { layoutModeTypes } from '~/constants/layout'
import { errorToast } from '~/store/helpers/toast'
import {
    deleteCookiesWithPrefix,
    removeCookie,
    setCookie,
} from '~/utils/cookies-utils'
import { resetProfileFlag, setProfile } from '../profile/actions'

import { NameFullProfile, TypeProfile, type IProfile } from '~/types/profile'
import { setEmailAccount, setPasswordAccount } from '../activate-account/actions'

export function* signInUserSaga(action: PayloadAction<SignInCredentials>) {
    try {
        const response: UserData = yield call(signInAws, action.payload)

        const {
            signInUserSession: { idToken },
            attributes,
        } = response

        const mode = layoutModeTypes.LIGHT_MODE
        const token = idToken.jwtToken
        yield call(
            setCookie,
            cookies.token.name,
            idToken.jwtToken,
            idToken.payload.exp / 1000,
        )
        yield put(changeLayoutMode(mode))

        delay(100)
        yield put(setAuthorization({ token }))
        yield put(signInSuccess({ token }))

        yield call(
            setCookie,
            cookies.cognito_profile.name,
            JSON.stringify(attributes),
            idToken.payload.exp / 1000,
        )

        delay(100)

        yield call([Router, Router.push], '/dashboard')
    } catch (error) {
        switch ((error as any)?.code) {
            case 'UserNotConfirmedException':
                yield put(setEmailAccount(action.payload.username))
                yield put(setPasswordAccount(action.payload.password))
                yield call([Router, Router.push], '/confirm-account')
                yield put(signInFailed((error as any).message))
                break
            default:
                yield put(resetLoading())
                yield put(signInFailed((error as any).message))
                errorToast('Não foi possível realizar o login.', 'Falha!')
                break
        }
    } finally {
        yield put(resetLoading())
    }
}

const checkTokenExpiration = (exp: number, iat: number) => {
    const currentUnixTime = new Date().getTime() / 1000

    return currentUnixTime > exp
}

export function* recoverUserByTokenSaga() {
    try {
        const session: CognitoUserSession = yield call(getUser)
        const access_token = session.getIdToken().getJwtToken()
        const userData = session.getIdToken().payload

        if (checkTokenExpiration(userData.exp, userData.iat)) {
            throw new TokenExpiredErr()
        }

        yield put(setAuthorization({ token: access_token }))
        yield put(setProfile(userData as IProfile))
    } catch (_error) {
        yield put(
            signOutUser({
                type_profile: TypeProfile.TUTOR,
            }),
        )
    }
}

export function* signOutUserSaga({
    payload,
}: PayloadAction<{ type_profile: TypeProfile }>) {
    try {
        yield put(changeLayoutMode(layoutModeTypes.LIGHT_MODE))
        yield call(removeCookie, cookies.token.name)
        yield call(removeCookie, cookies.cognito_profile.name)
        yield call(removeCookie, cookies.profile.name)
        yield call(deleteCookiesWithPrefix, 'pawkeepr')
        yield call(signOut)
        yield put(resetProfileFlag())
        yield put(signOutUserSuccess())
    } catch (error) {
        if ((error as string) === 'No current user') {
            yield put(signOutUserSuccess())
            return
        }
        yield put(signOutUserFailed((error as any).message))
    } finally {
        delay(1000)
        yield put(resetLoading())
        const partial_route = NameFullProfile[(payload?.type_profile as 1 | 2) || 2]

        yield call([Router, Router.push], `/${partial_route}/sign-in`)
    }
}

export function* LoginSaga() {
    yield takeLatest(`${name}/signInUser`, signInUserSaga)
    yield takeLatest(`${name}/recoverUserByToken`, recoverUserByTokenSaga)
    yield takeLatest(`${name}/signOutUser`, signOutUserSaga)
}

export default LoginSaga
