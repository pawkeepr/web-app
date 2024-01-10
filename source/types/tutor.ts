import type { Location } from './profile'

export type ITutor = {
    id?: string
    name: string
    lastName: string
    email: string
    cpf_cnpj: string
    created_at?: string
    updated_at?: string
    avatar?: string
    phone: string
    address?: Location
    whatsapp?: string
}
