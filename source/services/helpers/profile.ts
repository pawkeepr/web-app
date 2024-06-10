import type { IProfile } from '~/types/profile'
import { api } from '../api'
import type { KEYS_TYPE_USERS } from './feedback'

const urls = {
    UPDATE_PROFILE: (type_user: KEYS_TYPE_USERS) =>
        `/api-user/update-user/${type_user}`,
    UPDATE_PROFILE_PICTURE: () => '/docs_medical',
    FETCH_PROFILE_IMG: () => '/api-s3handler/get-object',
}

export const updateProfileV2 = async (data: IProfile, type_user: KEYS_TYPE_USERS) =>
    api.put(urls.UPDATE_PROFILE(type_user), data, {
        params: {
            user_id: data.id,
        },
    })

export const updateProfilePicture = (formData: FormData) =>
    api.post(urls.UPDATE_PROFILE_PICTURE(), formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

type FetchProfileImg = {
    key: string
}
export const fetchProfilePhoto = (data: FetchProfileImg) =>
    api.post(urls.FETCH_PROFILE_IMG(), data, {
        params: {
            type_doc: 1,
        },
    })
