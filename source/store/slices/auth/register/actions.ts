import { createAction } from '@reduxjs/toolkit'
import type { TypeProfile } from '~/types/profile'
import { name, type AccountSignUp } from './types'

export const registerUser = createAction<AccountSignUp>(`${name}/registerUser`)
export const registerUserSuccessful = createAction(`${name}/registerUserSuccessful`)
export const registerUserFailed = createAction<string>(`${name}/registerUserFailed`)
export const resetRegisterFlag = createAction(`${name}/resetRegisterFlag`)
export const onChangeTypeProfile = createAction<TypeProfile>(
    `${name}/onChangeTypeProfile`,
)
