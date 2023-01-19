import { AxiosInstance } from 'axios';
import { api } from '../api';

export type SignInCredentials = {
    username: string;
    password: string;
}


export type SignInResponse = {
    access_token: string
    token_type: "bearer"
}

// Login Method
export const postJwtLogin = async (data: SignInCredentials) => {
    return api.post<SignInResponse>('usuarios/login', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
};

export const getUser = async (token: string, newApi: AxiosInstance | null = null) => {

    const API = newApi || api

    return API.get('usuarios/logado', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    )
}	