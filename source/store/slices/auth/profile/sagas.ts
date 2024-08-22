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
    updateProfileTutorPawkeepr,
} from '~/services/helpers'
import { updateHasProfile } from '~/services/helpers/auth'
import { updateProfileV2 } from '~/services/helpers/profile'
import {
    AttributeTypeProfile,
    type AttributesProfile,
} from '~/services/helpers/types'
import { errorToast, infoToast, successToast } from '~/store/helpers/toast'
import { NameProfile, type IProfile } from '~/types/profile'
import { getCookie, setCookie } from '~/utils/cookies-utils'
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

const LINK_ACTIVATION_TYPES = {
    [AttributeTypeProfile.TUTOR]: '/tutor/activation',
    [AttributeTypeProfile.VETERINARY]: '/veterinary/activation',
} as const

const GET_PROFILE = {
    [AttributeTypeProfile.TUTOR]: getTutorProfile,
    [AttributeTypeProfile.VETERINARY]: getVetProfile,
} as const

export const DASHBOARD_PROFILE = {
    [AttributeTypeProfile.TUTOR]: '/tutor/dashboard',
    [AttributeTypeProfile.VETERINARY]: '/veterinary/dashboard',
} as const

function* onGetProfile({
    payload: { has_profile, type_profile },
}: PayloadAction<AttributesProfile>) {
    const link = LINK_ACTIVATION_TYPES[type_profile as '1' | '2']
    const dashboard = DASHBOARD_PROFILE[type_profile as '1' | '2']
    try {
        if (has_profile === 'no') {
            yield call([Router, Router.push], link)
        } else {
            const get = GET_PROFILE[type_profile as '1' | '2']
            const { data } = yield call(get)

            yield setCookie(cookies.profile.name, data)
            yield put(
                editProfileSuccess({
                    ...data,
                    'custom:type_profile': type_profile as '1' | '2',
                }),
            )

            // verifica a rota atual
            const currentPath = Router.asPath
            if (currentPath === '/dashboard') {
                yield call([Router, Router.push], dashboard)
            }
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
                yield call([Router, Router.push], link)

                break
        }
    }
}

const CreateProfiles = {
    [AttributeTypeProfile.TUTOR]: createProfileTutor,
    [AttributeTypeProfile.VETERINARY]: createProfileVet,
}

function* onAddProfile({ payload: profile }: PayloadAction<IProfile>) {
    try {
        const type_profile = profile.user_information?.type_profile as 1 | 2
        const createProfile = CreateProfiles[type_profile]

        if (profile.id) {
            const document = profile.user_information?.cpf_cnpj?.replace(/\D/g, '')
            const owner = `${document}@pawkeepr.com.br`
            yield call(updateProfileTutorPawkeepr, profile, owner)
        } else {
            yield call(createProfile, profile)
        }
        yield call(updateHasProfile, 'yes')
        const profile_cognito = getCookie(cookies.cognito_profile.name)
        yield call(
            setCookie,
            cookies.cognito_profile.name,
            JSON.stringify({
                ...profile_cognito,
                'custom:has_profile': 'yes',
            }),
        )
        yield put(
            getProfileSession({
                type_profile: type_profile as unknown as AttributeTypeProfile,
                has_profile: 'yes',
            }),
        )
        yield put(addSuccess())

        infoToast(
            'Aproveite agora todas as funcionalidades da Pawkeepr!',
            'Perfil ativado com sucesso!',
        )
        yield delay(1000)

        yield call([Router, Router.push], '/dashboard')
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
        const { data } = yield call(
            updateProfileV2,
            user,
            NameProfile[user.type_profile as 1 | 2],
        )

        yield call(updateHasProfile, 'yes')
        yield put(
            editProfileSuccess({
                ...data,
                'custom:has_profile': 'yes',
            }),
        )
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
