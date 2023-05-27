
import { Profile } from '~/store/auth/profile/types';
import { api } from '../api';

export const updateProfile = async (data: Profile) => {
    return api.post('/create-perfil', data);
}