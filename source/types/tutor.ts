import type { Location } from './profile'

export type ITutor = {
    id?: string
    first_name?: string
    last_name: string
    email: string
    cpf_cnpj: string
    created_at?: string
    updated_at?: string
    avatar?: string
    phone: string
    address?: Location
    whatsapp?: string
}
