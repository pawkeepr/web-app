import type { Breed } from '~/types/breedType'
import type { Gender, Species } from '~/types/speciesType'
import type { Contact, DTOProfile, Location } from './profile'

export type GenericSelect = {
    label: string
    value: string
}

export const On_Off = {
    yes: 'yes',
    no: 'no',
} as const
export type On_Off = (typeof On_Off)[keyof typeof On_Off]

type SaleAdoptionInfo = {
    value: string
    coin: string
    vaccination_status: string
    deworming_status: string
    health_certificate: string
    parent_details: string
    training_status: string
    special_care: string
    seller_contact: string
}

export type PetData = {
    name_pet: string
    name_img?: string
    microchip?: string | null
    identification_number?: string | null
    specie: Species | null | GenericSelect
    race: Breed | null | GenericSelect
    castrated?: boolean
    blood_type?: string | null | GenericSelect
    blood_donator?: boolean
    sex?: Gender | null | GenericSelect
    organ_donor?: boolean
    approximate_date?: boolean
    date_birth: string | null
    color?: string | null
    size?: string | null
    weight?: string | null
    url_img?: string | null
    pedigree?: boolean
    pedigree_registry?: string | null
    put_adoption?: boolean | null
    age?: string
    type_weight?: string
    put_on_sale?: boolean | null
    veterinary_edit?: boolean | null
    sale_adoption_info?: SaleAdoptionInfo
    date_update?: string
    url_profile?: string
}

export type Pet = PetData & {
    cpf_cnpj?: string
    id_pet?: string
}

export type IHealthInsurance = {
    name: string | null
    type_health: string | null
    number_health: string | null
    validity: string | null
}

export type ITutor = {
    cpf_cnpj: string
    first_name: string | null
    last_name: string | null
    name: string | null
    url_img: string | null
}

export type ISecondaryTutor = {
    name_tutor: string | null
    cpf_tutor: string | null
    phone_tutor: string | null
    emaiL_tutor: string | null
}

export type IMainResponsibleGuardian = {
    address: Location
    contact: Contact
} & ITutor

export interface IPetV2 {
    id?: string | null
    pet_information: PetData
    main_responsible_guardian: IMainResponsibleGuardian
    secondary_responsible_tutor: ISecondaryTutor
    health_insurance: IHealthInsurance
    veterinary: DTOProfile
}

export type PetDataSimplified = Pick<
    PetData,
    'name_pet' | 'specie' | 'race' | 'sex' | 'date_birth' | 'castrated'
>

export type IMainResponsibleGuardianSimplified = {
    first_name: string
    last_name: string
    email: string
    cpf_cnpj: string
    phone: string
    whatsapp: string
    country: string
    state: string
    city: string
    neighborhood: string
    street: string
}

export interface IPetV2Simplified {
    id?: string | null
    cpf_tutor: string
    pet_information: PetDataSimplified
    main_responsible_guardian: IMainResponsibleGuardianSimplified
    veterinary: DTOProfile
}
