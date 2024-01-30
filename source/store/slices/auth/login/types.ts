import type { LOADING } from '~/constants/loading'
import type { DTOProfile } from '~/types/profile'

export const name = 'Auth/Login'

export type IUser = {
    id: number
    username: string
    email: string
    eh_admin: boolean
    tipo_perfil: number
    autenticado: boolean
    ativo: boolean
    data_cadastro: string
    nome?: string
    sobrenome?: string
} | null

export type LoginState = {
    user: DTOProfile | null
    isAuthenticated: boolean
    rememberMe: boolean
    token: string
    error?: string | null
    isLoading: LOADING
    username: string
    password: string
}
