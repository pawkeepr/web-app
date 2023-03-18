import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  addContactFail,
  addContactSuccess,
  crmApiResponseError,
  crmApiResponseSuccess,
  deleteContactFail,
  deleteContactSuccess,
  updateContactFail,
  updateContactSuccess,
} from "./actions";

import {
  ADD_NEW_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
  UPDATE_CONTACT,
} from './types';

//Include Both Helper File with needed methods
import { PayloadAction } from "@reduxjs/toolkit";
import {
  addNewContact,
  deleteContact,
  getContacts as getContactsApi,
  updateContact,
} from "../../helpers/fakebackend_helper";

export function* getContacts() {
  try {
    const { data: contacts } = yield call(getContactsApi);
    yield put(crmApiResponseSuccess(contacts));
  } catch (error) {
    yield put(crmApiResponseError((error as Error).message));
  }
}

export function* onUpdateContact({ payload: contact }: PayloadAction<{ [key: string]: any }>) {
  try {
    const { data } = yield call(updateContact, contact);
    yield put(updateContactSuccess(data));
    toast.success("Contact Update Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateContactFail((error as Error).message));
    toast.error("Contact Update Failed", { autoClose: 3000 });
  }
}

export function* onDeleteContact({ payload: contact }: PayloadAction<{ [key: string]: any }>) {
  try {
    const { data } = yield call(deleteContact, contact);
    yield put(deleteContactSuccess({ contact, ...data }));
    toast.success("Contact Delete Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(deleteContactFail((error as Error).message));
    toast.error("Contact Delete Failed", { autoClose: 3000 });
  }
}

export function* onAddNewContact({ payload: contact }: PayloadAction<{ [key: string]: any }>) {
  try {
    const { data } = yield call(addNewContact, contact);
    yield put(addContactSuccess(data));
    toast.success("Contact Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addContactFail((error as Error).message));
    toast.error("Contact Added Failed", { autoClose: 3000 });
  }
}

export function* watchGetContacts() {
  yield takeEvery(GET_CONTACTS, getContacts);
}

export function* watchUpdateContact() {
  yield takeEvery(UPDATE_CONTACT, onUpdateContact);
}

export function* watchDeleteContact() {
  yield takeEvery(DELETE_CONTACT, onDeleteContact);
}

export function* watchAddNewContact() {
  yield takeEvery(ADD_NEW_CONTACT, onAddNewContact);
}

function* crmSaga() {
  yield all([
    fork(watchGetContacts),
    fork(watchDeleteContact),
    fork(watchUpdateContact),
    fork(watchAddNewContact),
  ]);
}

export default crmSaga;
