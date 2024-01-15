import type { DTOProfile, IVeterinaryInformation } from './profile'

export interface ActivateAccountVeterinary {
    veterinary_information: IVeterinaryInformation
    user_information: Omit<
        DTOProfile,
        'crmv' | 'specialty' | 'list_service_type' | 'list_specialty' | 'id'
    >
}
