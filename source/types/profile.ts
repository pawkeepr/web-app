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

export type ProfileUserInformation = {
    first_name: string
    last_name: string
    name: string
    url_img: string
    contact: Contact
    address: Location
}

export type IProfile = {
    id?: string
    cpf_cnpj: string
    crmv: string
    specialty_information: SpecialtyInformation
    user_information: ProfileUserInformation
}

export type DTOProfile = ProfileUserInformation & {
    id: string
    name: string
    crmv: string
    specialty: string
    cpf_cnpj: string
}
