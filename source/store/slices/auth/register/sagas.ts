import type { PayloadAction } from '@reduxjs/toolkit'
import { all, call, delay, fork, put, takeEvery } from 'redux-saga/effects'

//Include Both Helper File with needed methods
import { singUpAws } from '~/services/helpers/auth'
//Account Redux states
import { registerUser, registerUserFailed, registerUserSuccessful } from './actions'

import Router from 'next/router'
import type { AccountSignUp } from './types'

import { errorToast, infoToast, successToast } from '~/store/helpers/toast'

// Is user register successful then direct plot user in redux.
function* registerUserSaga({ payload: user }: PayloadAction<AccountSignUp>) {
    try {
        yield call(singUpAws, user)
        successToast(
            'Um e-mail de confirmação foi enviado para o seu e-mail.',
            'Registro realizado com sucesso!',
            {
                autoClose: 3000,
            },
        )
        yield delay(4000)
        yield put(registerUserSuccessful())

        infoToast(
            'Tente acessar sua conta com o email cadastrado, você será redirecionado para a página de ativação. Onde deverá digitar o número enviado para o seu email!".',
            'Ative sua Conta',
            {
                autoClose: 5000,
                position: 'bottom-center',
            },
        )
        yield delay(2000)
        yield call([Router, Router.push], '/sign-in')
    } catch (error) {
        console.log(error)
        errorToast(
            'Não foi possível realizar o registro.',
            'Erro ao realizar o registro!',
        )
        yield put(registerUserFailed(error as string))
    }
}

export function* watchUserRegister() {
    yield takeEvery(registerUser, registerUserSaga)
}

function* accountSaga() {
    yield all([fork(watchUserRegister)])
}

export default accountSaga
