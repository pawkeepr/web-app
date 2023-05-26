
import { createSlice } from '@reduxjs/toolkit';
import LOADING from '~/constants/loading';

import { FORGET_PASSWORD, FORGET_PASSWORD_ERROR, FORGET_PASSWORD_SUCCESS, ForgetPwdState, name } from './types';

const initialState: ForgetPwdState = {
  user: null,
  error: null,
  isLoading: LOADING.IDLE,
};


const forgetPwd = createSlice({
  name,
  reducers: {
    [FORGET_PASSWORD]: (state) => {
      state.isLoading = LOADING.PENDING;
    },
    [FORGET_PASSWORD_SUCCESS]: (state, action) => {
      state.isLoading = LOADING.SUCCESS;
      state.user = action.payload;
    },
    [FORGET_PASSWORD_ERROR]: (state, action) => {
      state.isLoading = LOADING.FAILED;
      state.error = action.payload;
    }
  },
  initialState,

})



export default forgetPwd.reducer;

export const {

} = forgetPwd.actions;

export {
  name
};
export type {
  ForgetPwdState
};


