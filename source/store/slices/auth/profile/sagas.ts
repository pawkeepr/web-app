import { all, call, delay, fork, put, takeEvery } from 'redux-saga/effects'

//Include Both Helper File with needed methods
import type { PayloadAction } from '@reduxjs/toolkit'
import Router from 'next/router'
// Login Redux States
import {
    addFail,
    addSuccess,
    editProfileError,
    editProfileSuccess,
} from './actions'
import {
    ACTION_ADD_NEW,
    ACTION_EDIT_PROFILE,
    ACTION_GET_PROFILE_SESSION,
} from './types'

import cookies from '~/constants/cookies'
import {
    createProfileVet,
    getVetProfile,
    updateProfileVet,
} from '~/services/helpers'
import type { AttributesProfile } from '~/services/helpers/types'
import { errorToast, successToast } from '~/store/helpers/toast'
import type { IProfile } from '~/types/profile'
import { setCookie } from '~/utils/cookies-utils'

function* onGetProfile({
    payload: { has_profile, type_profile },
}: PayloadAction<AttributesProfile>) {
    const link =
        type_profile === '1' ? '/veterinary/activation' : '/tutor/activation'
    if (has_profile === 'no') {
        yield call([Router, Router.push], link)
        return
    }
    try {
        const { data } = yield call(getVetProfile)
        yield setCookie(cookies.profile.name, data)
        yield put(editProfileSuccess(data))
    } catch (error) {
        console.log(error)
        yield call([Router, Router.push], link)
    }
}

function* onAddProfile({ payload: profile }: PayloadAction<IProfile>) {
    try {
        const { data } = yield call(createProfileVet, profile)
        yield delay(1000)
        yield put(addSuccess(data))
        successToast('Perfil ativado com sucesso!')
        yield call([Router, Router.push], '/dashboard')
    } catch (error) {
        errorToast('Erro ao ativar perfil!')
        yield put(addFail((error as any).message))
    }
}

function* onUpdateProfile({ payload: user }: PayloadAction<IProfile>) {
    try {
        const { data } = yield call(updateProfileVet, user, user.id as string)
        // yield call(createProfile, user)
        yield put(editProfileSuccess(data))
        successToast('Perfil atualizado com sucesso!')
    } catch (error) {
        console.log(error)
        errorToast('Erro ao atualizar perfil!')
        yield put(editProfileError((error as any).message))
    }
}

export function* watchUpdateProfile() {
    yield takeEvery(ACTION_EDIT_PROFILE, onUpdateProfile)
}

export function* watchGetProfile() {
    yield takeEvery(ACTION_GET_PROFILE_SESSION, onGetProfile)
}

export function* watchAddProfile() {
    yield takeEvery(ACTION_ADD_NEW, onAddProfile)
}

function* ProfileSaga() {
    yield all([
        fork(watchUpdateProfile),
        fork(watchGetProfile),
        fork(watchAddProfile),
    ])
}

export default ProfileSaga
