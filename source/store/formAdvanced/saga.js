import { put, call, takeEvery, all, delay } from "redux-saga/effects";
import { INCREMENT, DECREMENT, ADD_NEW_DATA } from './actionType';
import { increment, decrement, addNewData } from './action';

function* incrementAsync() {
   yield put({ type: INCREMENT });
   yield delay(1000);
   yield put({ type: DECREMENT });
   yield delay(1000);
   yield put({ type: INCREMENT });
   yield delay(1000);
   yield put({ type: DECREMENT });
}

function* onAddNewData({ payload: data }) {
   try {
     const response = yield call(addNewData, data);
     yield put(addDataSuccess(response));
   } catch (error) {
     yield put(addDataFail(error));
   }
 }

function* watchIncrementAsync() {
   yield takeEvery(incrementAsync);
}

export function* watchAddNewData() {
   yield takeEvery(ADD_NEW_DATA, onAddNewData);
}

export function* CounterSaga() {

   yield all([watchIncrementAsync(), fork(watchAddNewData),]);
}