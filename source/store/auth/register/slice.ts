import { createSlice } from '@reduxjs/toolkit';

import { AccountState, name } from './types';

import { registerUser, resetRegisterFlag } from './actions';

const initialState: AccountState = {
  message: null,
  loading: true,
  success: false,
  error: false
};

const accountSlice = createSlice({
  name,
  initialState,
  reducers: {
    registerUser: (state) => {
      state.loading = true;
    },
    registerUserSuccessful: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    registerUserFailed: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = true;
    },
    resetRegisterFlag: (state) => {
      state.success = false;
      state.error = false;
    },
  },
});

export {
  registerUser,
  resetRegisterFlag
};

export default accountSlice.reducer;
