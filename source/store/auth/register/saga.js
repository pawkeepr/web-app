import { all, call, fork, put, takeEvery } from "redux-saga/effects";

//Account Redux states
import { REGISTER_USER } from "./actionTypes";
import { registerUserFailed, registerUserSuccessful } from "./actions";

//Include Both Helper File with needed methods
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper";


// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtRegister, "/post-jwt-register", user);
      yield put(registerUserSuccessful(response));
    } else if (process.env.REACT_APP_API_URL) {
      const response = yield call(postFakeRegister, user);
      if (response.message === "success") {
        yield put(registerUserSuccessful(response));
      } else {
        yield put(registerUserFailed(response));
      }
    }
  } catch (error) {
    yield put(registerUserFailed(error));
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
