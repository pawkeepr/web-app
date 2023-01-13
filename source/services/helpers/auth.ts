import { api } from '../api';

type SignInCredentials = {
    email: string;
    password: string;
}


type SignInResponse = {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

// Login Method
export const postJwtLogin = (data: SignInCredentials) => api.post<SignInResponse>('login', data);
