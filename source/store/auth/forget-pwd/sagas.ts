import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    ACTION_FORGET_PASSWORD,
    forgetPwdFailed,
    forgetPwdSuccessful,
} from './actions';

import {
    forgetPwd,
} from '~/services/helpers/auth';

import {
    IForgetPwd
} from './types';

import { errorToast, successToast } from '../../helpers/toast';

export function* forgetUser({ payload }: PayloadAction<IForgetPwd>) {
    try {
        yield call(forgetPwd, payload.email);
        yield put(forgetPwdSuccessful());
        successToast('Verifique seu email para redefinir sua senha.', 'Sucesso!')
    } catch (error) {
        errorToast('Ocorreu um erro, tente novamente.', 'Falha!')
        yield put(forgetPwdFailed());
    }
}


export function* watchUserPasswordForget() {
    yield takeEvery(ACTION_FORGET_PASSWORD, forgetUser);
}

function* forgetPasswordSaga() {
    yield all([fork(watchUserPasswordForget)]);
}

export default forgetPasswordSaga;