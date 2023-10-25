import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
    addFail,
    addSuccess,
    getAllFail,
    getAllSuccess,
    updateFail,
    updateSuccess
} from "./actions";

import {
    createAppointmentVet,
    getAllAppointmentsVet,
    updateAppointmentVet,
} from '~/services/helpers';

//Include Both Helper File with needed methods
import { PayloadAction } from "@reduxjs/toolkit";
import { errorToast, successToast } from "~/store/helpers/toast";
import {
    ACTION_ADD_NEW,
    ACTION_GET_ALL, ACTION_UPDATE, Data,
    IAppointmentVetData
} from "./types";

import {
    getAllScheduledCanceledSuccess,
    getAllScheduledConfirmedDoneSuccess,
    getAllScheduledConfirmedSuccess,
    getAllScheduledSuccess
} from '../scheduled/actions';

export function* onGetAll() {
    try {
        const { data } = yield call(getAllAppointmentsVet);
        const {
            all_scheduled,
            all_scheduled_canceled,
            all_scheduled_confirmed,
            all_scheduled_confirmed_done
        } = data as IAppointmentVetData

        yield put(getAllScheduledSuccess(all_scheduled));
        yield put(getAllScheduledCanceledSuccess(all_scheduled_canceled));
        yield put(getAllScheduledConfirmedSuccess(all_scheduled_confirmed));
        yield put(getAllScheduledConfirmedDoneSuccess(all_scheduled_confirmed_done));

        yield put(getAllSuccess(data));
    } catch (error) {
        yield put(getAllFail(error as any));
    }
}

export function* onUpdate({ payload }: PayloadAction<{ appointment_id: string, data: Partial<Data> }>) {
    try {
        const { appointment_id, data: appointment } = payload
        const { data } = yield call(updateAppointmentVet, appointment, appointment_id);
        yield put(updateSuccess(data));
        yield successToast('Alterado com sucesso!')
    } catch (error) {
        yield errorToast('Erro ao alterar!')
        yield put(updateFail((error as Error).message));
    }
}

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

export function* onAdd({ payload: { data: appointment } }: PayloadAction<{ data: Data, }>) {
    try {
        const { data } = yield call(createAppointmentVet, appointment);
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

// export function* watchDelete() {
//   yield takeEvery(ACTION_DELETE, onDelete);
// }

export function* watchAddNew() {
    yield takeEvery(ACTION_ADD_NEW, onAdd);
}

// export function* watchToggleStatus() {
//   yield takeEvery(ACTION_TOGGLE_STATUS, onToggleStatus);
// }


function* crmSaga() {
    yield all([
        fork(watchGetAll),
        fork(watchUpdate),
        // // fork(watchDelete),
        fork(watchAddNew),
        // fork(watchToggleStatus),
    ]);
}

export default crmSaga;
