// Profile Vet

import { TypeProfile } from '~/types/profile'
import { api } from '../api'

export const KEYS_TYPE_USERS = {
    tutor: 'tutor',
    vet: 'vet',
} as const
export type KEYS_TYPE_USERS = (typeof KEYS_TYPE_USERS)[keyof typeof KEYS_TYPE_USERS]

export const KEYS_TYPE_USER_BY_NUMBER = {
    [TypeProfile.VETERINARY]: KEYS_TYPE_USERS.vet,
    [TypeProfile.TUTOR]: KEYS_TYPE_USERS.tutor,
} as const
export type KEYS_TYPE_USER_BY_NUMBER =
    (typeof KEYS_TYPE_USER_BY_NUMBER)[keyof typeof KEYS_TYPE_USER_BY_NUMBER]

const urls = {
    CREATE_FEEDBACK: (type_user: KEYS_TYPE_USERS) =>
        `/api-user/update-feedback-user/${type_user}`,
}

export type PostFeedback = {
    comments: string
}

export const postFeedback = async (
    data: PostFeedback,
    type_user: KEYS_TYPE_USERS,
) => api.put(urls.CREATE_FEEDBACK(type_user), data)
