import { all, fork, put, takeEvery } from "redux-saga/effects";

import {
    getAllScheduledCanceledFail,
    getAllScheduledCanceledSuccess,
    getAllScheduledConfirmedDoneFail,
    getAllScheduledConfirmedDoneSuccess,
    getAllScheduledConfirmedFail,
    getAllScheduledConfirmedSuccess,
    getAllScheduledFail,
    getAllScheduledSuccess
} from "./actions";

//Include Both Helper File with needed methods
import { PayloadAction } from "@reduxjs/toolkit";
import {
    ACTION_GET_ALL_SCHEDULED,
    ACTION_GET_ALL_SCHEDULED_CANCELED,
    ACTION_GET_ALL_SCHEDULED_CONFIRMED,
    ACTION_GET_ALL_SCHEDULED_CONFIRMED_DONE,
    Data
} from "./types";

export function* onGetAllScheduled({ payload }: PayloadAction<Data[]>) {
    try {
        yield put(getAllScheduledSuccess(payload));
    } catch (error) {
        yield put(getAllScheduledFail(error as any));
    }
}

export function* onGetAllScheduledCanceled({ payload }: PayloadAction<Data[]>) {
    try {
        yield put(getAllScheduledCanceledSuccess(payload));
    } catch (error) {
        yield put(getAllScheduledCanceledFail(error as any));
    }
}

export function* onGetAllScheduledConfirmed({ payload }: PayloadAction<Data[]>) {
    try {
        yield put(getAllScheduledConfirmedSuccess(payload));
    } catch (error) {
        yield put(getAllScheduledConfirmedFail(error as any));
    }
}

export function* onGetAllScheduledConfirmedDone({ payload }: PayloadAction<Data[]>) {
    try {
        yield put(getAllScheduledConfirmedDoneSuccess(payload));
    } catch (error) {
        yield put(getAllScheduledConfirmedDoneFail(error as any));
    }
}



export function* watchGetAllScheduled() {
    yield takeEvery(ACTION_GET_ALL_SCHEDULED, onGetAllScheduled);
}

export function* watchGetAllScheduledCanceled() {
    yield takeEvery(ACTION_GET_ALL_SCHEDULED_CANCELED, onGetAllScheduledCanceled);
}

export function* watchGetAllScheduledConfirmed() {
    yield takeEvery(ACTION_GET_ALL_SCHEDULED_CONFIRMED, onGetAllScheduledConfirmed);
}

export function* watchGetAllScheduledConfirmedDone() {
    yield takeEvery(ACTION_GET_ALL_SCHEDULED_CONFIRMED_DONE, onGetAllScheduledConfirmedDone);
}



function* crmSaga() {
    yield all([
        fork(watchGetAllScheduled),
        fork(watchGetAllScheduledCanceled),
        fork(watchGetAllScheduledConfirmed),
        fork(watchGetAllScheduledConfirmedDone),
        // // fork(watchDelete),
        // fork(watchToggleStatus),
    ]);
}

export default crmSaga;
