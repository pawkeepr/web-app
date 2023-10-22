import { ITutor } from './tutor';

export type IPet = {
    id?: string;
    name: string;
    species: Species;
    breed: Breed;
    plain_type?: string;
    health_insurance?: string;
    card_number?: string;
    wallet_validity?: number;
    chip_number?: string;
    id_office_register?: string;
    date_birth: string | Date;
    bloodType?: BloodType;
    color?: string;
    allergies?: string[];
    preexistingConditions?: string[];
    medicationsInUse?: string[];
    castrated: boolean;
    dateOfCastration?: string;
    dateOfAdoption?: string;
    healthHistory?: string[];
    diet?: Diet;
    specialPhysicalFeatures?: string[];
    behavior?: string;
    activityLevel?: string;
    ownerEmergencyContact: ITutor;
    address?: string;
    avatar?: string;
    created_at?: string;
    updated_at?: string;
    gender: string;
}