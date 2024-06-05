import { all, call, delay, fork, put, takeEvery } from 'redux-saga/effects'

//Include Both Helper File with needed methods
import type { PayloadAction } from '@reduxjs/toolkit'
import Router from 'next/router'
import cookies from '~/constants/cookies'
import {
    createProfileTutor,
    createProfileVet,
    getTutorProfile,
    getVetProfile,
    updateProfileTutor,
    updateProfileVet,
} from '~/services/helpers'
import { updateHasProfile } from '~/services/helpers/auth'
import {
    AttributeTypeProfile,
    type AttributesProfile,
} from '~/services/helpers/types'
import { errorToast, infoToast, successToast } from '~/store/helpers/toast'
import type { IProfile } from '~/types/profile'
import { setCookie } from '~/utils/cookies-utils'
import { signOutUser } from '../login/actions'
// Login Redux States
import {
    addFail,
    addSuccess,
    editProfile,
    editProfileError,
    editProfileSuccess,
    getProfileSession,
} from './actions'
import {
    ACTION_ADD_NEW,
    ACTION_EDIT_PROFILE,
    ACTION_GET_PROFILE_SESSION,
} from './types'

function* onGetProfile({
    payload: { has_profile, type_profile },
}: PayloadAction<AttributesProfile>) {
    const link =
        type_profile === AttributeTypeProfile.VETERINARY
            ? '/veterinary/activation'
            : '/tutor/activation'

    try {
        if (has_profile === 'no') {
            yield call([Router, Router.push], link)
        } else {
            const getVet =
                type_profile === AttributeTypeProfile.VETERINARY
                    ? getVetProfile
                    : getTutorProfile
            const { data } = yield call(getVet)
            yield setCookie(cookies.profile.name, data)
            yield put(editProfileSuccess(data))
        }
    } catch (error) {
        if (!(typeof error === 'object') || !error) return
        if (!('response' in error)) return
        if (!(typeof error.response === 'object') || !error.response) return
        if (!('status' in error.response) || !error.response.status) return

        switch (error.response.status) {
            case 404: // Not Found
                yield call(updateHasProfile, 'no')
                errorToast('Perfil não encontrado!')
                yield put(signOutUser())
                break
        }
    }
}

function* onAddProfile({ payload: profile }: PayloadAction<IProfile>) {
    try {
        const path = window.location.pathname
        const isVeterinary = /veterinary/.test(path)
        const createProfile = isVeterinary ? createProfileVet : createProfileTutor
        const type_profile = isVeterinary
            ? AttributeTypeProfile.VETERINARY
            : AttributeTypeProfile.TUTOR

        if (profile.id) {
            yield call(updateProfileTutor, profile, profile.id as string)
        } else {
            yield call(createProfile, profile)
        }

        yield call(updateHasProfile, 'yes')
        yield put(addSuccess())
        yield put(
            getProfileSession({
                type_profile,
                has_profile: 'yes',
            }),
        )
        yield delay(1000)
        infoToast(
            'Você será deslogado, logue novamente para ter acesso a plataforma e todas as suas funcionalidades!',
            'Perfil ativado com sucesso!',
        )
        yield put(signOutUser())
    } catch (error) {
        if (!(typeof error === 'object') || !error) return
        if (!('response' in error)) return
        if (!(typeof error.response === 'object') || !error.response) return
        if (!('status' in error.response) || !error.response.status) return

        switch (error.response.status) {
            case 409:
                yield put(editProfile(profile))
                yield call(updateHasProfile, 'yes')
                break
            default:
                yield call(updateHasProfile, 'no')
                if (!('message' in error) || !error.message) {
                    errorToast('Erro ao ativar perfil!')
                    return
                }
                if (!(typeof error.message === 'string') || !error.message) return

                errorToast(error.message)

                yield put(addFail())
        }
    }
}

export function* onUpdateProfile({ payload: user }: PayloadAction<IProfile>) {
    try {
        const path = window.location.pathname
        const isVeterinary = /veterinary/.test(path)
        const updateProfile = isVeterinary ? updateProfileVet : updateProfileTutor
        const { data } = yield call(updateProfile, user, user.id as string)

        yield call(updateHasProfile, 'yes')
        yield put(editProfileSuccess(data))
        successToast('Perfil atualizado com sucesso!')
    } catch (error) {
        console.error('🚀 ~ function*onUpdateProfile ~ line 121 ~ error:', error)
        errorToast('Erro ao atualizar perfil!')
        yield put(editProfileError())
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
