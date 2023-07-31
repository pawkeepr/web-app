
import { Profile } from '~/store/auth/profile/types';
import { api } from '../api';

const url = process.env.API_URL;

export const updateProfile = async (data: Profile) => {
    return api.post('/create-perfil', data);
}

export const getUserProfile = async () => {
    return api.get(`${url}/search-perfil`);
}