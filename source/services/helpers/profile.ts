
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { Profile } from '~/store/auth/profile/types';
import { api } from '../api';

const url = process.env.API_URL;

export const updateProfile = async (data: Profile) => {
    return api.post('/create-perfil', data);
}

export const createProfile = async (data: Profile) => {

    const { idToken } = await Auth.currentSession();

    // const { getJwtToken } = getIdToken()
    const token = idToken.jwtToken
    const config = {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        }
    }
    return axios.post(`${url}/create-perfil`, data, config);
}