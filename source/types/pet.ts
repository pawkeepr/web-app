import type { BloodType } from '~/types/bloodType'
import type { Breed } from '~/types/breedType'
import type { Gender, Species } from '~/types/speciesType'
import type { IHealthInsurance, On_Off } from './pet-v2'
import type { DTOProfile } from './profile'
import type { ITutor } from './tutor'

export type IPet = {
    id?: string
    name: string
    specie: Species
    race: Breed
    cpf_cnpj: string
    microchip?: string
    identification_number?: string
    health_insurance?: IHealthInsurance
    chip_number?: string
    date_birth: string | Date
    blood_type?: BloodType
    blood_donator?: On_Off | null | boolean
    color?: string
    allergies?: string[]
    medicationsInUse?: string[]
    castrated?: On_Off | null | boolean
    dateOfCastration?: string
    organ_donor?: On_Off | null | boolean
    size?: string
    weight?: string
    pedigree?: On_Off | null | boolean
    pedigree_registry?: string
    ownerEmergencyContact: ITutor
    avatar?: string
    created_at?: string
    updated_at?: string
    sex: Gender
    veterinary: DTOProfile
}
