
import { createSlice } from '@reduxjs/toolkit';
import LOADING from '~/constants/loading';

import { destroyCookie } from 'nookies';
import cookies from '~/constants/cookies';
import {
  BuilderLogin,
  BuilderRecoverUser,
  recover_user_by_token,
  sign_in_user
} from './thunks';
import { LoginState, name } from './types';

const initialState: LoginState = {
  isAuthenticated: false,
  rememberMe: false,
  token: '',
  user: null,
  error: null,
  username: '',
  password: '',
  visiblePassword: false,
  isLoading: LOADING.IDLE,
};


const loginSlice = createSlice({
  name,
  reducers: {
    onChangeUsername: (state, action) => {
      state.username = action.payload;
    },
    onChangePassword: (state, action) => {
      state.password = action.payload;
    },
    onToggleVisiblePassword: (state) => {
      state.visiblePassword = !state.visiblePassword;
    },
    onChangeRememberMe: (state) => {
      state.rememberMe = !state.rememberMe;
    },
    onSetRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
    logoutUser: (state) => {
      destroyCookie(null, cookies.token.name);
      state.isAuthenticated = false;
      state.token = '';
      state.user = null;
      state.error = null;
      state.username = '';
      state.password = '';
      state.visiblePassword = false;
      state.isLoading = LOADING.IDLE;
    }
  },
  initialState,
  extraReducers: (builder) => {
    BuilderLogin(builder);
    BuilderRecoverUser(builder);
  },
})



export default loginSlice.reducer;

export const {
  onToggleVisiblePassword,
  onChangePassword,
  onChangeRememberMe,
  onChangeUsername,
  onSetRememberMe,
  logoutUser,
} = loginSlice.actions;

export {
  name,
  sign_in_user,
  recover_user_by_token,
};
export type {
  LoginState,
};

