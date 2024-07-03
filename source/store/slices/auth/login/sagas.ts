import type { PayloadAction } from '@reduxjs/toolkit'
import { call, delay, put, takeLatest } from 'redux-saga/effects'
import cookies from '~/constants/cookies'

import {
    resetLoading,
    setAuthorization,
    signInFailed,
    signInSuccess,
    signInTutor,
    signInVet,
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
    type SignInResponse,
} from '~/services/helpers/auth'

import { layoutModeTypes } from '~/constants/layout'
import { errorToast } from '~/store/helpers/toast'
import {
    deleteCookiesWithPrefix,
    removeCookie,
    setCookie,
} from '~/utils/cookies-utils'

import { AttributeTypeProfile } from '~/services/helpers/types'
import { NameFullProfile, type TypeProfile } from '~/types/profile'
import { setEmailAccount, setPasswordAccount } from '../activate-account/actions'

export function* signInTutorSaga(action: PayloadAction<SignInCredentials>) {
    const user: SignInResponse = yield call(signInAws, action.payload)
    if (user['custom:type_profile'] !== AttributeTypeProfile.TUTOR) {
        yield call(signOut)
        throw new Error('Você não tem permissão para acessar essa página.')
    }

    const token = user.tokens?.idToken?.toString() as string

    const idToken = user.tokens?.idToken
    yield call(
        setCookie,
        cookies.token.name,
        token,
        (idToken?.payload.exp as number) / 1000,
    )

    delay(100)
    yield put(setAuthorization({ token }))
    yield put(signInSuccess({ token, user }))

    yield call(
        setCookie,
        cookies.cognito_profile.name,
        JSON.stringify(user),
        (idToken?.payload.exp as number) / 1000,
    )

    delay(100)
}

export function* signInVetSaga(action: PayloadAction<SignInCredentials>) {
    const user: SignInResponse = yield call(signInAws, action.payload)

    if (user['custom:type_profile'] !== AttributeTypeProfile.VETERINARY) {
        yield call(signOut)
        throw new Error('Você não tem permissão para acessar essa página.')
    }

    const token = user.tokens?.idToken?.toString() as string

    const idToken = user.tokens?.idToken
    yield call(
        setCookie,
        cookies.token.name,
        token,
        (idToken?.payload.exp as number) / 1000,
    )

    delay(100)
    yield put(setAuthorization({ token }))
    yield put(signInSuccess({ token, user }))

    yield call(
        setCookie,
        cookies.cognito_profile.name,
        JSON.stringify(user),
        (idToken?.payload.exp as number) / 1000,
    )

    delay(100)
}

export function* signInUserSaga(
    action: PayloadAction<SignInCredentials & { mode: 'vet' | 'tutor' }>,
) {
    const mode = layoutModeTypes.LIGHT_MODE

    yield call(signOut)
    yield put(changeLayoutMode(mode))

    try {
        if (action.payload.mode === 'vet') {
            yield put(signInVet(action.payload))
        } else {
            yield put(signInTutor(action.payload))
        }
        yield call([Router, Router.push], '/dashboard')
    } catch (error) {
        switch ((error as any)?.name) {
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
        const session: SignInResponse = yield call(getUser)
        const access_token = session.tokens?.accessToken?.toString() as string
        const userData = session.tokens?.idToken?.payload

        if (
            checkTokenExpiration(userData?.exp as number, userData?.iat as number)
        ) {
            throw new TokenExpiredErr()
        }

        yield put(setAuthorization({ token: access_token }))
    } catch (_error) {
        yield put(
            signOutUser({
                type_profile: AttributeTypeProfile.TUTOR,
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
    yield takeLatest(`${name}/signInTutor`, signInTutorSaga)
    yield takeLatest(`${name}/signInVet`, signInVetSaga)
    yield takeLatest(`${name}/signInUser`, signInUserSaga)

    yield takeLatest(`${name}/recoverUserByToken`, recoverUserByTokenSaga)
    yield takeLatest(`${name}/signOutUser`, signOutUserSaga)
}

export default LoginSaga
