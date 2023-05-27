import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  addPetFail,
  addPetSuccess,
  deletePetFail,
  deletePetSuccess,
  updatePetFail,
  updatePetSuccess,
} from "./actions";

import {
  ADD_NEW_PET,
  DELETE_PET,
  GET_PETS,
  UPDATE_PET,
} from './types';

//Include Both Helper File with needed methods
import { PayloadAction } from "@reduxjs/toolkit";
import {
  deletePet,
  getPets as getPetsApi,
  postPet,
  updatePet,
} from "../../helpers/fakebackend_helper";

import { apiResponseError, apiResponseSuccess } from './slice';

export function* getPets() {
  try {
    const { data: pets } = yield call(getPetsApi);
    yield put(apiResponseSuccess(pets));
  } catch (error) {
    yield put(apiResponseError(error as any));
  }
}

export function* onUpdatePet({ payload: pet }: PayloadAction<{ [key: string]: any }>) {
  try {
    const { data } = yield call(updatePet, pet);
    yield put(updatePetSuccess(data));
    toast.success("Pet Update Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updatePetFail((error as Error).message));
    toast.error("Pet Update Failed", { autoClose: 3000 });
  }
}

export function* onDeletePet({ payload: pet }: PayloadAction<{ [key: string]: any }>) {
  try {
    const { data } = yield call(deletePet, pet.id);
    yield put(deletePetSuccess({ pet, ...data }));
    toast.success("Pet Delete Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(deletePetFail((error as Error).message));
    toast.error("Pet Delete Failed", { autoClose: 3000 });
  }
}

export function* onAddNewPet({ payload: pet }: PayloadAction<{ [key: string]: any }>) {
  try {
    const { data } = yield call(postPet, pet);
    toast.success("Pet Adicionado com Sucesso", { autoClose: 3000 });
    yield put(addPetSuccess(data));

  } catch (error) {
    toast.error("Ocorreu um Erro ao Adicionar Pet! :'(", { autoClose: 3000 });
    yield put(addPetFail((error as Error).message));
  }
}

export function* watchGetPets() {
  yield takeEvery(GET_PETS, getPets);
}

export function* watchUpdatePet() {
  yield takeEvery(UPDATE_PET, onUpdatePet);
}

export function* watchDeletePet() {
  yield takeEvery(DELETE_PET, onDeletePet);
}

export function* watchAddNewPet() {
  yield takeEvery(ADD_NEW_PET, onAddNewPet);
}

function* crmSaga() {
  yield all([
    fork(watchGetPets),
    fork(watchDeletePet),
    fork(watchUpdatePet),
    fork(watchAddNewPet),
  ]);
}

export default crmSaga;
