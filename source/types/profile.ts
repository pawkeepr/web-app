import type { AttributeTypeProfile } from '~/services/helpers/types'
import type { On_Off } from './pet-v2'

export type Contact = {
    email: string | null
    phone: string | null
    whatsapp: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    linkedIn: string | null
    youtube: string | null
}

export type Location = {
    country: string
    zipCode: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
    complement: string
}

export type SpecialtyInformation = {
    specialty: string
    list_specialty: string[]
    list_service_type: string[]
}

export const TypeProfile = {
    VETERINARY: 1,
    TUTOR: 2,
    NONE: null,
} as const
export type TypeProfile = (typeof TypeProfile)[keyof typeof TypeProfile]

export const NameProfile = {
    '1': 'vet',
    '2': 'tutor',
} as const
export type NameProfile = (typeof NameProfile)[keyof typeof NameProfile]
export type AttrTypeProfile = keyof typeof NameProfile

export const ModeProfile = {
    vet: 'vet',
    tutor: 'tutor',
} as const
export type ModeProfile = (typeof ModeProfile)[keyof typeof ModeProfile]

export const CodeProfile = {
    vet: 1,
    tutor: 2,
} as const
export type CodeProfile = (typeof CodeProfile)[keyof typeof CodeProfile]

export const NameFullProfile = {
    '1': 'v',
    '2': 't',
} as const
export type NameFullProfile = (typeof NameFullProfile)[keyof typeof NameFullProfile]

export type ProfileUserInformation = {
    first_name: string
    last_name: string
    name: string
    type_profile: TypeProfile
    url_img: string
    contact: Contact
    cpf_cnpj?: string
    address: Location
}

const TypeSchedule = {
    online: 'online',
    home: 'home',
    clinic: 'clinic',
    other: 'other',
} as const
type TypeSchedule = (typeof TypeSchedule)[keyof typeof TypeSchedule]

export type ScheduleDays = {
    type_schedule: TypeSchedule
    day: string
    hour_start: string
    hour_end: string
    out_of_hours_service: string
}

export type IVeterinaryInformation = {
    crmv: string
    cpf_cnpj: string
    opening_days_times: ScheduleDays[]
} & SpecialtyInformation

export type IProfile = {
    id?: string | null
    owner: string
    veterinary_information?: IVeterinaryInformation
    user_information: ProfileUserInformation
    type_profile?: TypeProfile
}

export type IProfileCognito = {
    'cognito:username'?: string
    'custom:has_profile'?: On_Off
    'custom:type_profile'?: AttributeTypeProfile
    email?: string
    email_verified?: boolean
    event_id?: string
    exp?: number
    iat?: number
    iss?: string
    jti?: string
    origin_jti?: string
    sub?: string
    token_use?: string
}

export type DTOProfile = ProfileUserInformation & {
    id: string
    name: string
    crmv: string
    specialty: string
    cpf_cnpj: string
}
