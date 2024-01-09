import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    ACTION_FORGET_PASSWORD,
    ACTION_UPDATE_PASSWORD,
    forgetPwdFailed,
    forgetPwdSuccessful,
} from './actions';

import { forgetPwd, forgotPasswordSubmit } from '~/services/helpers/auth';

import { IForgetPwd } from './types';

import { errorToast, successToast } from '~/store/helpers/toast';

export function* onForgotUser({ payload }: PayloadAction<IForgetPwd>) {
    try {
        yield call(forgetPwd, payload.email);
        yield put(forgetPwdSuccessful());
        successToast(
            'Verifique seu email para redefinir sua senha.',
            'Sucesso!',
        );
    } catch (error) {
        errorToast('Ocorreu um erro, tente novamente.', 'Falha!');
        yield put(forgetPwdFailed());
    }
}

export function* onUpdatePassword({
    payload,
}: PayloadAction<Required<IForgetPwd>>) {
    try {
        const { code, email, password } = payload;
        yield call(forgotPasswordSubmit, email, code, password);
        yield put(forgetPwdSuccessful());
        successToast(
            'Você será redirecionado ao login, em poucos instantes!',
            'Senha Redefinida com Sucesso!',
        );
    } catch (error) {
        errorToast('Ocorreu um erro, tente novamente.', 'Falha!');
        yield put(forgetPwdFailed());
    }
}

export function* watchUserPasswordForget() {
    yield takeEvery(ACTION_FORGET_PASSWORD, onForgotUser);
}

export function* watchUserPasswordUpdate() {
    yield takeEvery(ACTION_UPDATE_PASSWORD, onUpdatePassword);
}

function* forgetPasswordSaga() {
    yield all([fork(watchUserPasswordForget), fork(watchUserPasswordUpdate)]);
}

export default forgetPasswordSaga;
