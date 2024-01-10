import { createAction } from '@reduxjs/toolkit'

import {
    FORGET_PASSWORD,
    FORGET_PASSWORD_ERROR,
    FORGET_PASSWORD_SUCCESS,
    IForgetPwd,
    RESET_LOADING,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_ERROR,
    UPDATE_PASSWORD_SUCCESS,
    name,
} from './types'

export const ACTION_FORGET_PASSWORD = `${name}/${FORGET_PASSWORD}`
export const ACTION_FORGET_PASSWORD_SUCCESS = `${name}/${FORGET_PASSWORD_SUCCESS}`
export const ACTION_FORGET_PASSWORD_ERROR = `${name}/${FORGET_PASSWORD_ERROR}`
export const ACTION_RESET_LOADING = `${name}/${RESET_LOADING}`
export const ACTION_UPDATE_PASSWORD = `${name}/${UPDATE_PASSWORD}`
export const ACTION_UPDATE_PASSWORD_SUCCESS = `${name}/${UPDATE_PASSWORD_SUCCESS}`
export const ACTION_UPDATE_PASSWORD_ERROR = `${name}/${UPDATE_PASSWORD_ERROR}`

export const forgetPwd = createAction<IForgetPwd>(ACTION_FORGET_PASSWORD)
export const forgetPwdSuccessful = createAction(ACTION_FORGET_PASSWORD_SUCCESS)
export const forgetPwdFailed = createAction(ACTION_FORGET_PASSWORD_ERROR)

export const updatePwd = createAction<Required<IForgetPwd>>(ACTION_UPDATE_PASSWORD)
export const updatePwdSuccessful = createAction<IForgetPwd>(
    ACTION_UPDATE_PASSWORD_SUCCESS,
)
export const updatePwdFailed = createAction(ACTION_UPDATE_PASSWORD_ERROR)

export const resetLoading = createAction(ACTION_RESET_LOADING)
