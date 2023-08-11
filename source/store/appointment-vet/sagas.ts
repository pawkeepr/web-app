import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
    getAllFail,
    getAllSuccess
} from "./actions";

import {
    getConsults,
} from '~/services/helpers';

//Include Both Helper File with needed methods
import {
    ACTION_GET_ALL
} from "./types";

export function* onGetAll() {
    try {
        const { data: actives } = yield call(getConsults);
        yield put(getAllSuccess(actives));
    } catch (error) {
        yield put(getAllFail(error as any));
    }
}

// export function* onUpdate({ payload }: PayloadAction<{ id: string, data: Partial<Data> }>) {
//   try {
//     const { id, data } = payload
//     const response = yield call(updateUsersProfessionals, id, data);
//     yield put(updateSuccess(response.data));
//     yield successToast('Alterado com sucesso!')
//   } catch (error) {
//     yield errorToast('Erro ao alterar!')
//     yield put(updateFail((error as Error).message));
//   }
// }

// export function* onToggleStatus({ payload }: PayloadAction<{ id: string, data: Pick<Data, 'active'> }>) {
//   try {
//     const { id, data } = payload
//     const response = yield call(updateUsersProfessionals, id, data);
//     yield put(toggleStatusSuccess(response.data));
//     yield successToast('Status alterado com sucesso!')
//   } catch (error) {
//     yield errorToast('Erro ao alterar status!')
//     yield put(toggleStatusFail((error as Error).message));
//   }
// }

// export function* onDelete({ payload: { id } }: PayloadAction<{ id: string }>) {
//   try {
//     yield call(deleteUsersProfessionals, id);
//     yield put(deleteSuccess({ id }));
//   } catch (error) {
//     yield put(deleteFail((error as Error).message));
//   }
// }

// export function* onAdd({ payload }: PayloadAction<Data>) {
//   try {
//     const { data } = yield call(postUsersProfessionals, payload);
//     yield put(addSuccess(data));
//     yield successToast('Cadastrado com sucesso!')
//   } catch (error) {
//     yield errorToast('Erro ao cadastrar!')
//     yield put(addFail((error as Error).message));
//   }
// }

export function* watchGetAll() {
    yield takeEvery(ACTION_GET_ALL, onGetAll);
}

// export function* watchUpdate() {
//   yield takeEvery(ACTION_UPDATE, onUpdate);
// }

// export function* watchDelete() {
//   yield takeEvery(ACTION_DELETE, onDelete);
// }

// export function* watchAddNew() {
//   yield takeEvery(ACTION_ADD_NEW, onAdd);
// }

// export function* watchToggleStatus() {
//   yield takeEvery(ACTION_TOGGLE_STATUS, onToggleStatus);
// }


function* crmSaga() {
    yield all([
        fork(watchGetAll),
        // fork(watchUpdate),
        // // fork(watchDelete),
        // fork(watchAddNew),
        // fork(watchToggleStatus),
    ]);
}

export default crmSaga;
