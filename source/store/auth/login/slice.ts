
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LOADING from '~/constants/loading';



import { api } from '~/services/api';
import { IUser, LoginState, name } from './types';

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

    signOutUser: (state) => {
      state.isLoading = LOADING.IDLE;
    },
    signOutUserSuccess: (state) => {
      state.isAuthenticated = false;
      state.token = '';
      state.user = null;
      state.error = null;
      state.username = '';
      state.password = '';
      state.visiblePassword = false;
      state.isLoading = LOADING.SUCCESS;
    },
    signOutUserFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = LOADING.SUCCESS
    },

    signInUser: (state, action: PayloadAction<{ username: string; password: string }>) => {
      state.isLoading = LOADING.PENDING;
    },
    signInSuccess: (state, action: PayloadAction<{ user: IUser, token: string }>) => {
      if (api.defaults.headers['Authorization']) {
        api.defaults.headers['Authorization'] = `Bearer ${action.payload.token}`;
      }

      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = LOADING.SUCCESS;
    },
    signInFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = LOADING.FAILED;
    },
    recoverUserByToken: (state, action: PayloadAction<string>) => {
      state.isLoading = LOADING.PENDING;
    },
    recoverUserByTokenSuccess: (state, action: PayloadAction<{ user: IUser, access_token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      state.isAuthenticated = true;
      state.isLoading = LOADING.SUCCESS;
    },
    recoverUserByTokenFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = LOADING.FAILED;
    },
    resetLoading: (state) => {
      state.isLoading = LOADING.IDLE;
    },
  },
  initialState,

})



export default loginSlice.reducer;

export const {
  onToggleVisiblePassword,
  onChangePassword,
  onChangeRememberMe,
  onChangeUsername,
  onSetRememberMe,
} = loginSlice.actions;

export {
  name
};
export type {
  LoginState
};


