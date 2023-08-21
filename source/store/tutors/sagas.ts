import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
    addFail,
    addSuccess,
    deleteFail,
    deleteSuccess,
    getAllFail,
    getAllSuccess,
    updateFail,
    updateSuccess,
} from "./actions";


//Include Both Helper File with needed methods
import {
    ACTION_ADD_NEW,
    ACTION_DELETE,
    ACTION_GET_ALL, ACTION_UPDATE, Data
} from "./types";

import { PayloadAction } from "@reduxjs/toolkit";
import {
    deleteTutor,
    getTutors,
    postTutor,
    updateTutor,
} from "../../helpers/fakebackend_helper";

import { errorToast, successToast } from "../helpers/toast";

export function* onGetAll() {
    try {
        const { data } = yield call(getTutors);
        yield put(getAllSuccess(data));
    } catch (error) {
        yield put(getAllFail(error as any));
    }
}

export function* onUpdate({ payload }: PayloadAction<{ id: string, data: Partial<Data> }>) {
    try {
        const { data: tutors, id } = payload
        const { data } = yield call(updateTutor, tutors, id);
        yield put(updateSuccess(data));
        yield successToast('Alterado com sucesso!')
    } catch (error) {
        yield errorToast('Erro ao alterar!')
        yield put(updateFail((error as Error).message));
    }
}

export function* onDelete({ payload: { id } }: PayloadAction<{ id: string }>) {
    try {
        yield call(deleteTutor, id);
        yield put(deleteSuccess({ id }));
    } catch (error) {
        yield put(deleteFail((error as Error).message));
    }
}

export function* onAdd({ payload }: PayloadAction<Data>) {
    try {
        const { data } = yield call(postTutor, payload);
        yield put(addSuccess(data));
        yield successToast('Cadastrado com sucesso!')
    } catch (error) {
        yield errorToast('Erro ao cadastrar!')
        yield put(addFail((error as Error).message));
    }
}

export function* watchGetAll() {
    yield takeEvery(ACTION_GET_ALL, onGetAll);
}

export function* watchUpdate() {
    yield takeEvery(ACTION_UPDATE, onUpdate);
}

export function* watchDelete() {
    yield takeEvery(ACTION_DELETE, onDelete);
}

export function* watchAddNew() {
    yield takeEvery(ACTION_ADD_NEW, onAdd);
}


function* crmSaga() {
    yield all([
        fork(watchGetAll),
        fork(watchUpdate),
        fork(watchDelete),
        fork(watchAddNew),
    ]);
}

export default crmSaga;
