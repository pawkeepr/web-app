import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  addTutorFail,
  addTutorSuccess,
  deleteTutorFail,
  deleteTutorSuccess,
  updateTutorFail,
  updateTutorSuccess,
} from "./actions";

import {
  ADD_NEW_TUTOR,
  DELETE_TUTOR,
  GET_TUTORS,
  UPDATE_TUTOR,
} from './types';

//Include Both Helper File with needed methods
import { PayloadAction } from "@reduxjs/toolkit";
import {
  deleteTutor,
  getTutors as getTutorsApi,
  postTutor,
  updateTutor,
} from "../../helpers/fakebackend_helper";

import { apiResponseError, apiResponseSuccess } from './slice';

export function* getTutors() {
  try {
    const { data: tutors } = yield call(getTutorsApi);
    yield put(apiResponseSuccess(tutors));
  } catch (error) {
    yield put(apiResponseError(error as any));
  }
}

export function* onUpdateTutor({ payload: tutor }: PayloadAction<{ [key: string]: any }>) {
  try {
    const { data } = yield call(updateTutor, tutor);
    yield put(updateTutorSuccess(data));
    toast.success("Tutor Update Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateTutorFail((error as Error).message));
    toast.error("Tutor Update Failed", { autoClose: 3000 });
  }
}

export function* onDeleteTutor({ payload: tutor }: PayloadAction<{ [key: string]: any }>) {
  try {
    const { data } = yield call(deleteTutor, tutor);
    yield put(deleteTutorSuccess({ tutor, ...data }));
    toast.success("Tutor Delete Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(deleteTutorFail((error as Error).message));
    toast.error("Tutor Delete Failed", { autoClose: 3000 });
  }
}

export function* onAddNewTutor({ payload: tutor }: PayloadAction<{ [key: string]: any }>) {
  try {
    const { data } = yield call(postTutor, tutor);
    yield put(addTutorSuccess(data));
    toast.success("Tutor Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addTutorFail((error as Error).message));
    toast.error("Tutor Added Failed", { autoClose: 3000 });
  }
}

export function* watchGetTutors() {
  yield takeEvery(GET_TUTORS, getTutors);
}

export function* watchUpdateTutor() {
  yield takeEvery(UPDATE_TUTOR, onUpdateTutor);
}

export function* watchDeleteTutor() {
  yield takeEvery(DELETE_TUTOR, onDeleteTutor);
}

export function* watchAddNewTutor() {
  yield takeEvery(ADD_NEW_TUTOR, onAddNewTutor);
}

function* crmSaga() {
  yield all([
    fork(watchGetTutors),
    fork(watchDeleteTutor),
    fork(watchUpdateTutor),
    fork(watchAddNewTutor),
  ]);
}

export default crmSaga;
