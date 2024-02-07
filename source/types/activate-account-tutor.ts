import type { DTOProfile } from './profile'

export interface ActivateAccountTutor {
    user_information: Omit<
        DTOProfile,
        'crmv' | 'specialty' | 'list_service_type' | 'list_specialty' | 'id'
    >
}
