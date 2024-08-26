import axios from 'axios'
import cookies from '~/constants/cookies'
import type { IProfile } from '~/types/profile'
import { getCookie } from '~/utils/cookies-utils'
import { api, apiFile } from '../api'
import type { KEYS_TYPE_USERS } from './feedback'

/**
 * URLs para as requisições da API de perfil do usuário
 */
const urls = {
    /**
     * Atualiza as informações do perfil do usuário
     */
    UPDATE_PROFILE: (type_user: KEYS_TYPE_USERS) =>
        `/api-user/update-user/${type_user}`,
    /**
     * Retorna um URL assinado para upload de arquivos
     */
    GET_SIGNED_URL: () => '/api/get-file-signed-url',
    /**
     * Retorna a imagem de perfil do usuário
     */
    FETCH_PROFILE_IMG: () => '/api-s3handler/get-object-s3',
    /**
     * Envia a imagem de perfil do usuário para o S3
     */
    POST_PROFILE: () => '/api/s3handler/upload-object-s3',
    /**
     * Atualiza a imagem de perfil do usuário
     */
    UPDATE_PROFILE_PICTURE: (type_user: KEYS_TYPE_USERS) =>
        `api-user/update-file-user/${type_user}`,
}

/**
 * Atualiza as informações do perfil do usuário
 * @param data Dados do perfil do usuário
 * @param type_user Tipo do usuário (tutor ou veterinário)
 */
export const updateProfileV2 = async (data: IProfile, type_user: KEYS_TYPE_USERS) =>
    api.put(urls.UPDATE_PROFILE(type_user), data, {
        params: {
            user_id: data.id,
        },
    })

/**
 * Retorna um URL assinado para upload de arquivos
 */
export type GetSignedUrl = {
    url: string
    fileName: string
}

/**
 * Tipos de arquivos aceitos para upload de imagem de perfil
 */
export type FileTypePossible = 'image/png' | 'image/jpeg' | 'image/jpg'

/**
 * Retorna um URL assinado para upload de arquivos
 * @param file_type Tipo do arquivo
 */
export const getSignedUrl = (file_type: FileTypePossible) =>
    apiFile.get<GetSignedUrl>(urls.GET_SIGNED_URL(), {
        params: {
            file_type,
        },
    })

/**
 * Dados necessarios para atualizar a foto de perfil do usuario
 */
export type UpdateProfilePicture = {
    object_name: string
}

/**
 * Atualiza a imagem de perfil do usuário
 * @param data Dados da imagem de perfil do usuário
 * @param type_user Tipo do usuário (tutor ou veterinário)
 * @param user_id ID do usuário
 */
export const updateProfilePicture = (
    data: UpdateProfilePicture,
    type_user: KEYS_TYPE_USERS,
    user_id: string,
) =>
    api.put<GetSignedUrl>(urls.UPDATE_PROFILE_PICTURE(type_user), data, {
        params: {
            user_id: user_id,
        },
    })

/**
 * Envia a imagem de perfil do usuário para o S3
 * @param formData Dados da imagem de perfil do usuário em formato de formulário
 * @param user_type Tipo do usuário (tutor ou veterinário)
 * @param user_id ID do usuário
 * @param onProgress Função que recebe o progresso do upload da imagem
 */
export const postProfilePicture = (
    formData: FormData,
    user_type: KEYS_TYPE_USERS,
    user_id: string,
    onProgress?: (percentCompleted: number) => void,
) => {
    return axios.post<{ fileName: string }>(urls.POST_PROFILE(), formData, {
        headers: {
            Authorization: `${getCookie(cookies.token.name)}`,
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent?.total,
            )
            onProgress?.(percentCompleted)
        },
        params: {
            user_id: user_id,
            user_type: user_type,
        },
    })
}

/**
 * Retorna a imagem de perfil do usuário
 * @param data Dados da imagem de perfil do usuário
 */
type FetchProfileImg = {
    key: string
}
export const fetchProfilePhoto = (data: FetchProfileImg) =>
    api.post(urls.FETCH_PROFILE_IMG(), data, {
        params: {
            type_doc: 1,
        },
    })
