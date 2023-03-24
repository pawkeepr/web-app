import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  addVeterinaryAppointmentFail,
  addVeterinaryAppointmentSuccess,
  deleteVeterinaryAppointmentFail,
  deleteVeterinaryAppointmentSuccess,
  updateVeterinaryAppointmentFail,
  updateVeterinaryAppointmentSuccess,
} from "./actions";

import {
  ADD_NEW_VETERINARY_APPOINTMENT,
  DELETE_VETERINARY_APPOINTMENT,
  GET_VETERINARY_APPOINTMENTS,
  UPDATE_VETERINARY_APPOINTMENT,
} from './types';

//Include Both Helper File with needed methods
import { PayloadAction } from "@reduxjs/toolkit";
import {
  deleteVeterinaryAppointment,
  getVeterinaryAppointment as getVeterinaryAppointmentsApi,
  postVeterinaryAppointment,
  updateVeterinaryAppointment,
} from "../../helpers/fakebackend_helper";

import { apiResponseError, apiResponseSuccess } from './slice';

export function* getVeterinaryAppointments() {
  try {
    const { data: veterinaryAppointments } = yield call(getVeterinaryAppointmentsApi);
    yield put(apiResponseSuccess(veterinaryAppointments));
  } catch (error) {
    yield put(apiResponseError(error as any));
  }
}

export function* onUpdateVeterinaryAppointment({ payload: veterinaryAppointment }: PayloadAction<{ [key: string]: any }>) {
  try {
    const { data } = yield call(updateVeterinaryAppointment, veterinaryAppointment);
    yield put(updateVeterinaryAppointmentSuccess(data));
    toast.success("VeterinaryAppointment Update Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateVeterinaryAppointmentFail((error as Error).message));
    toast.error("VeterinaryAppointment Update Failed", { autoClose: 3000 });
  }
}

export function* onDeleteVeterinaryAppointment({ payload: veterinaryAppointment }: PayloadAction<{ [key: string]: any }>) {
  try {
    const { data } = yield call(deleteVeterinaryAppointment, veterinaryAppointment);
    yield put(deleteVeterinaryAppointmentSuccess({ veterinaryAppointment, ...data }));
    toast.success("VeterinaryAppointment Delete Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(deleteVeterinaryAppointmentFail((error as Error).message));
    toast.error("VeterinaryAppointment Delete Failed", { autoClose: 3000 });
  }
}

export function* onAddNewVeterinaryAppointment({ payload: veterinaryAppointment }: PayloadAction<{ [key: string]: any }>) {
  try {
    const { data } = yield call(postVeterinaryAppointment, veterinaryAppointment);
    yield put(addVeterinaryAppointmentSuccess(data));
    toast.success("VeterinaryAppointment Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addVeterinaryAppointmentFail((error as Error).message));
    toast.error("VeterinaryAppointment Added Failed", { autoClose: 3000 });
  }
}

export function* watchGetVeterinaryAppointments() {
  yield takeEvery(GET_VETERINARY_APPOINTMENTS, getVeterinaryAppointments);
}

export function* watchUpdateVeterinaryAppointment() {
  yield takeEvery(UPDATE_VETERINARY_APPOINTMENT, onUpdateVeterinaryAppointment);
}

export function* watchDeleteVeterinaryAppointment() {
  yield takeEvery(DELETE_VETERINARY_APPOINTMENT, onDeleteVeterinaryAppointment);
}

export function* watchAddNewVeterinaryAppointment() {
  yield takeEvery(ADD_NEW_VETERINARY_APPOINTMENT, onAddNewVeterinaryAppointment);
}

function* crmSaga() {
  yield all([
    fork(watchGetVeterinaryAppointments),
    fork(watchDeleteVeterinaryAppointment),
    fork(watchUpdateVeterinaryAppointment),
    fork(watchAddNewVeterinaryAppointment),
  ]);
}

export default crmSaga;
