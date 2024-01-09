import LOADING from '~/constants/loading';

export const name = 'Auth/Login';

export type IUser = {
    id: number;
    username: string;
    email: string;
    eh_admin: boolean;
    tipo_perfil: number;
    autenticado: boolean;
    ativo: boolean;
    data_cadastro: string;
    nome?: string;
    sobrenome?: string;
} | null;

interface UserAuthenticationData {
    sub: string; // Example: "7516c9f3-17c0-4eba-96d2-03dd6e1a0159"
    email_verified: boolean; // Example: true
    iss: string; // Example: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_PDrf1BmAs"
    cognito_username: string; // Example: "murilomontinojr@hotmail.com"
    origin_jti: string; // Example: "5de93acf-889d-477e-9b36-f17c861625a1"
    aud: string; // Example: "3g4amih96ugs9e0ucd4a7fcudp"
    event_id: string; // Example: "9462d0ee-9f66-43a1-9bc3-4339c047cd4a"
    token_use: string; // Example: "id"
    auth_time: number; // Example: 1692572974
    exp: number; // Example: 1692576574
    iat: number; // Example: 1692572974
    jti: string; // Example: "d55c37d1-67c0-4696-8709-eca04c2dcc29"
    email: string; // Example: "murilomontinojr@hotmail.com"
}

export type LoginState = {
    user: IUser;
    isAuthenticated: boolean;
    rememberMe: boolean;
    token: string;
    error?: string | null;
    isLoading: LOADING;
    username: string;
    password: string;
};
