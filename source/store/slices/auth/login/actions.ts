import { createAction } from '@reduxjs/toolkit'

import type { TypeProfile } from '~/types/profile'
import { name } from './types'

export const setAuthorization = createAction<{ token: string }>(
    `${name}/setAuthorization`,
)

export const signInUser = createAction<{ username: string; password: string }>(
    `${name}/signInUser`,
)

export const signInTutor = createAction<{ username: string; password: string }>(
    `${name}/signInTutor`,
)
export const signInVet = createAction<{ username: string; password: string }>(
    `${name}/signInVet`,
)

export const signInSuccess = createAction<{ token: any }>(`${name}/signInSuccess`)
export const signInFailed = createAction<string>(`${name}/signInFailed`)

export const recoverUserByToken = createAction<string>(`${name}/recoverUserByToken`)
export const recoverUserByTokenSuccess = createAction<{ access_token: string }>(
    `${name}/recoverUserByTokenSuccess`,
)
export const recoverUserByTokenFailed = createAction<string>(
    `${name}/recoverUserByTokenFailed`,
)

export const signOutUser = createAction<{ type_profile: TypeProfile }>(
    `${name}/signOutUser`,
)
export const signOutUserSuccess = createAction(`${name}/signOutUserSuccess`)
export const signOutUserFailed = createAction(`${name}/signOutUserFailed`)

export const resetLoading = createAction(`${name}/resetLoading`)
