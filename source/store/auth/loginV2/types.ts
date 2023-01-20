import LOADING from '~/constants/loading';

export const name = 'Auth/Login'

export type LoginState = {
    isAuthenticated: boolean;
    rememberMe: boolean;
    user: {
        id: number,
        username: string,
        email: string,
        eh_admin: boolean,
        tipo_perfil: number,
        autenticado: boolean,
        ativo: boolean,
        data_cadastro: string,
        nome?: string,
        sobrenome?: string
    } | null;
    token: string;
    error?: string | null;
    isLoading: LOADING;
    username: string;
    password: string;
    visiblePassword: boolean;
}