import type { IGeolocationAppointment } from '~/types/appointment'
import { api } from '../api'
import type { UpdateProfilePicture } from './profile'

const urls = {
    /**
     * URL para buscar informações de um pet publicamente
     */
    FETCH_PROFILE_PET: () => '/api-external/pet-was-found',
    /**
     * URL para buscar informações de verificação de um pet publicamente
     */
    FETCH_PROFILE_VERIFY: () => '/api-external/pet-was-verify',
    /**
     * URL para buscar os registros médicos de um pet publicamente
     */
    FETCH_PROFILE_MEDICAL_RECORDS: () => '/api-external/search-medical-pet',
    /**
     * URL para atualizar a foto de perfil de um pet
     */
    PUT_PROFILE_PHOTO_PET: () => '/api-pet/update-file-pet',
    /**
     * URL para enviar a geolocalização do Pet encontrado
     */
    PUT_PET_LOCATION: () => '/api-external/pet-location-qr-code',
    /**
     * URL para listar localizações de leitura do qrcode do pet
     */
    GET_PET_LOCATION: () => '/api-pet/list-location-qr-code',
}

/**
 * Função para buscar informações de um pet publicamente
 * @param id_pet id do pet que se deseja buscar
 */
export const fetchPublicPet = async (id_pet: string) =>
    api.get(urls.FETCH_PROFILE_PET(), {
        params: { id_pet },
    })

/**
 * Função para atualizar a foto de perfil de um pet
 * @param data dados da foto de perfil
 * @param id_pet id do pet que se deseja atualizar a foto de perfil
 * @param cpf_cnpj cpf ou cnpj do tutor do pet
 */
export const putPhotoProfilePet = async (
    data: UpdateProfilePicture,
    id_pet: string,
    cpf_cnpj: string,
) =>
    api.put(urls.PUT_PROFILE_PHOTO_PET(), data, {
        params: { id_pet, cpf_cnpj },
    })

/**
 * Função para buscar os registros médicos de um pet publicamente
 * @param id_pet id do pet que se deseja buscar os registros médicos
 */
export const fetchPublicMedicalRecords = async (id_pet: string) =>
    api.get(urls.FETCH_PROFILE_MEDICAL_RECORDS(), {
        params: { id_pet },
    })

/**
 * Função para buscar informações de verificação de um pet publicamente
 * @param id_pet id do pet que se deseja buscar as informações de verificação
 */
export const fetchPublicPetVerify = async (id_pet: string) =>
    api.get(urls.FETCH_PROFILE_VERIFY(), {
        params: { id_pet },
    })

/**
 * Função para enviar a geolocalização do Pet encontrado
 * @param id_pet id do pet perdido que se deseja enviar a geolocalização
 * @param geolocation dados da geolocalização
 */
export const putPetLocation = async (
    id_pet: string,
    geolocation: IGeolocationAppointment,
) => api.put(urls.PUT_PET_LOCATION(), { ...geolocation }, { params: { id_pet } })

/**
 * Função para buscar todas as localizações de leitura do qr code do pet
 * @param id_pet id do pet que se deseja buscar a localização
 */
export const getPetLocation = async (id_pet: string, cpf_cnpj: string) =>
    api.get(urls.GET_PET_LOCATION(), { params: { id_pet, cpf_cnpj } })
