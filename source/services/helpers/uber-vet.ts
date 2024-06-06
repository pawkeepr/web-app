import type { Location } from '~/types/profile'
import { api } from '../api'

const urls = {
    FETCH_ALL_VETS: () => '/api-user/search-all-vet-address',
}

export type UberVetGetter = Partial<Location>

interface VetContact {
    whatsapp: string
    youtube: string
    twitter: string
    phone: string
    facebook: string
    instagram: string
    linkedin: string | null
    email: string
}

interface VetAddress {
    country: string
    zipCode: string
    number: string
    city: string
    street: string
    state: string
    neighborhood: string
    complement: string
}

interface OpeningDaysTimes {
    hour_end: string
    out_of_hours_service: string
    type_schedule: string
    day: string
    hour_start: string
}

interface VeterinaryInformation {
    types_service: string | null
    assessments: string | null
    specialty: string
    diseases_treated: string | null
    types_animals: string | null
    list_service_type: string[]
    list_specialty: string[]
    about: string | null
    types_health_accept: string | null
    opening_days_times: OpeningDaysTimes[]
    training: string | null
    sub_specialty: string | null
    stars: string | null
    number_calls_day: string | null
    crmv: string
    services_performed: string | null
    number_appointments_day: string | null
    professional_experience: string | null
}

export interface Vet {
    name_vet: string
    contact_vet: VetContact
    address_vet: VetAddress
    veterinary_information: VeterinaryInformation
}

export const getAllUberVets = async (location: UberVetGetter) =>
    api.get<Vet[]>(urls.FETCH_ALL_VETS(), { params: location })
