import type { IProfile } from '~/types/profile'
import { api, apiFile } from '../api'
import type { KEYS_TYPE_USERS } from './feedback'

const urls = {
    UPDATE_PROFILE: (type_user: KEYS_TYPE_USERS) =>
        `/api-user/update-user/${type_user}`,
    UPDATE_PROFILE_PICTURE: () => '/api/get-signed-url',
    GET_SIGNED_URL: () => '/api/get-signed-url',
    FETCH_PROFILE_IMG: () => '/api-s3handler/get-object-s3',
}

export const updateProfileV2 = async (data: IProfile, type_user: KEYS_TYPE_USERS) =>
    api.put(urls.UPDATE_PROFILE(type_user), data, {
        params: {
            user_id: data.id,
        },
    })

export const getSignedUrl = () => apiFile.get(urls.GET_SIGNED_URL())

export const updateProfilePicture = (formData: FormData) =>
    apiFile.post(urls.UPDATE_PROFILE_PICTURE(), formData, {
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
