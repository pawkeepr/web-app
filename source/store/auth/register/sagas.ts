import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

//Account Redux states
import { registerUser, registerUserFailed, registerUserSuccessful } from "./actions";

//Include Both Helper File with needed methods
import {
  singUpAws
} from "~/services/helpers/auth";

import { AccountSignUp } from './types';

import { errorToast, successToast } from '../../helpers/toast';

// Is user register successful then direct plot user in redux.
function* registerUserSaga({ payload: user }: PayloadAction<AccountSignUp>) {
  try {
    yield call(singUpAws, user);
    yield put(registerUserSuccessful());
    successToast('Um e-mail de confirmação foi enviado para o seu e-mail.', 'Registro realizado com sucesso!')
  } catch (error) {
    errorToast('Não foi possível realizar o registro.', 'Erro ao realizar o registro!')
    yield put(registerUserFailed(error as string));
  }
}

export function* watchUserRegister() {
  yield takeEvery(registerUser, registerUserSaga);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
