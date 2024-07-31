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
    POST_PROFILE: (type_user: KEYS_TYPE_USERS) =>
        `/api/s3handler/upload-object-s3/${type_user}`,
    UPDATE_PROFILE_PICTURE: (type_user: KEYS_TYPE_USERS) =>
        `api-user/update-file-user/${type_user}`,
}

export const updateProfileV2 = async (data: IProfile, type_user: KEYS_TYPE_USERS) =>
    api.put(urls.UPDATE_PROFILE(type_user), data, {
        params: {
            user_id: data.id,
        },
    })

export type GetSignedUrl = {
    url: string
    filename: string
}

export const getSignedUrl = () => apiFile.get<GetSignedUrl>(urls.GET_SIGNED_URL())

type UpdateProfilePicture = {
    object_name: string
}
export const updateProfilePictureV2 = (
    data: UpdateProfilePicture,
    type_user: KEYS_TYPE_USERS,
    user_id: string,
) =>
    api.post<GetSignedUrl>(urls.UPDATE_PROFILE_PICTURE(type_user), data, {
        params: {
            user_id: user_id,
        },
    })

export const updateProfilePicture = (
    formData: FormData,
    type_user: KEYS_TYPE_USERS,
    user_id: string,
) => {
    return axios.put(urls.POST_PROFILE(type_user), formData, {
        headers: {
            Authorization: `Bearer ${getCookie(cookies.token.name)}`,
            'Content-Type': 'multipart/form-data',
        },
        params: {
            user_id: user_id,
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

export const uploadToS3 = async (img: string) => {
    const { data } = await getSignedUrl()

    const image = Buffer.from(img, 'base64')

    await axios.put(data.url, image, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'image/jpeg',
            'Content-Length': image.length.toString(),
        },
    })

    return {
        status: 200,
        message: {
            filename: data.filename,
        },
    }
}
