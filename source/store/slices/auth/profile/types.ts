import LOADING from '~/constants/loading'
import { ADD_FAIL, ADD_NEW, ADD_SUCCESS } from '~/store/helpers/constants'
import { IProfile } from '~/types/profile'

export const name = 'profile'

export const SET_PROFILE = 'setProfile'
export const EDIT_PROFILE = 'editProfile'
export const EDIT_PROFILE_SUCCESS = 'editProfileSuccess'
export const EDIT_PROFILE_ERROR = 'editProfileError'
export const RESET_PROFILE_FLAG = 'resetProfileFlag'
export const GET_PROFILE_SESSION = 'getProfileSession'

export const ACTION_SET_PROFILE = `${name}/${SET_PROFILE}`
export const ACTION_EDIT_PROFILE = `${name}/${EDIT_PROFILE}`
export const ACTION_EDIT_PROFILE_SUCCESS = `${name}/${EDIT_PROFILE_SUCCESS}`
export const ACTION_EDIT_PROFILE_ERROR = `${name}/${EDIT_PROFILE_ERROR}`
export const ACTION_RESET_PROFILE_FLAG = `${name}/${RESET_PROFILE_FLAG}`
export const ACTION_GET_PROFILE_SESSION = `${name}/${GET_PROFILE_SESSION}`

export const ACTION_ADD_NEW = `${name}/${ADD_NEW}`
export const ACTION_ADD_SUCCESS = `${name}/${ADD_SUCCESS}`
export const ACTION_ADD_FAIL = `${name}/${ADD_FAIL}`

export enum RULES {
    ADMIN = 1,
    VETERINARY = 2,
    TUTOR = 3,
}

export type InitialStateProfile = {
    isLoading: LOADING
    error?: string | null
    user: IProfile | null
}
