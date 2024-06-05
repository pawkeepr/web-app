import type { DTOProfile } from './profile'

export interface ActivateAccountTutor {
    id?: string | null
    owner: string
    user_information: Omit<
        DTOProfile,
        'crmv' | 'specialty' | 'list_service_type' | 'list_specialty' | 'id'
    >
}
