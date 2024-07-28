import axios from 'axios'
import cookies from '~/constants/cookies'
import type { IProfile } from '~/types/profile'
import { getCookie } from '~/utils/cookies-utils'
import { api, apiFile } from '../api'
import type { KEYS_TYPE_USERS } from './feedback'

const urls = {
    UPDATE_PROFILE: (type_user: KEYS_TYPE_USERS) =>
        `/api-user/update-user/${type_user}`,
    GET_SIGNED_URL: () => '/api/get-file-signed-url/',
    FETCH_PROFILE_IMG: () => '/api-s3handler/get-object-s3',
}

export const updateProfileV2 = async (data: IProfile, type_user: KEYS_TYPE_USERS) =>
    api.put(urls.UPDATE_PROFILE(type_user), data, {
        params: {
            user_id: data.id,
        },
    })

export const getSignedUrl = () => apiFile.get(urls.GET_SIGNED_URL())

export const updateProfilePicture = (formData: FormData, urlSigned: string) => {
    const token = getCookie(cookies.token.name)
    return axios.post(urlSigned, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${token}`,
        },
    })
}

type FetchProfileImg = {
    key: string
}
export const fetchProfilePhoto = (data: FetchProfileImg) =>
    api.post(urls.FETCH_PROFILE_IMG(), data, {
        params: {
            type_doc: 1,
        },
    })
