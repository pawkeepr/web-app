import { all, call, fork, put, takeEvery } from 'redux-saga/effects'

//Include Both Helper File with needed methods
import type { PayloadAction } from '@reduxjs/toolkit'
// Login Redux States
import {
    activateAccountError,
    activateAccountSuccess,
    resendConfirmationCodeError,
    resendConfirmationCodeSuccess,
} from './actions'
import {
    ACTION_ACTIVATE_ACCOUNT,
    ACTION_RESEND_CONFIRMATION_CODE,
    type ActivateAccount,
} from './types'

import { confirmSignUp, resendConfirmationCode } from '~/services/helpers/auth'

import { signInUser } from '../login/actions'

import { errorToast, successToast } from '~/store/helpers/toast'

function* onResendConfirmationCode({
    payload,
}: PayloadAction<{ username: string }>) {
    const { username } = payload
    try {
        const { data } = yield call(resendConfirmationCode, username)
        yield put(resendConfirmationCodeSuccess(data))
        successToast('Código de confirmação reenviado com sucesso')
    } catch (error) {
        errorToast('Error resending confirmation code')
        yield put(resendConfirmationCodeError((error as any).message))
    }
}

function* onActiveAccount({ payload }: PayloadAction<ActivateAccount>) {
    const { username, code, password } = payload
    try {
        const { data } = yield call(confirmSignUp, username, code)
        yield put(activateAccountSuccess(data))
        successToast('Conta ativada com sucesso')
        yield put(signInUser({ username, password }))
    } catch (error) {
        errorToast('Erro na ativação da conta, código inválido ou expirado!')
        yield put(activateAccountError((error as any).message))
    }
}

export function* watchActivateAccount() {
    yield takeEvery(ACTION_ACTIVATE_ACCOUNT, onActiveAccount)
}

export function* watchResendConfirmation() {
    yield takeEvery(ACTION_RESEND_CONFIRMATION_CODE, onResendConfirmationCode)
}

function* ActivateAccountSaga() {
    yield all([fork(watchResendConfirmation), fork(watchActivateAccount)])
}

export default ActivateAccountSaga
