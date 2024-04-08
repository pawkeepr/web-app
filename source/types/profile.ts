export type Specialty = {
    type: string
    name_specialty: string
}

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
    list_specialty: Specialty[]
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
    NONE: null,
} as const
export type NameProfile = (typeof NameProfile)[keyof typeof NameProfile]

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

export type IVeterinaryInformation = {
    crmv: string
    cpf_cnpj: string
} & SpecialtyInformation

export type IProfile = {
    id?: string
    veterinary_information?: IVeterinaryInformation
    user_information: ProfileUserInformation
    type_profile?: TypeProfile
}

export type DTOProfile = ProfileUserInformation & {
    id: string
    name: string
    crmv: string
    specialty: string
    cpf_cnpj: string
}
