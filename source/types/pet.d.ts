import { Gender } from '~/store/slices/pets/speciesType';
import { On_Off } from './pet-v2';
import { ITutor } from './tutor';
import { Veterinary } from '~/entities/Veterinary';
import { DTOProfile } from './profile';

export type IPet = {
    id?: string;
    name: string;
    cpf_tutor: string;
    specie: Species;
    breed: Breed;
    plain_type?: string;
    health_insurance?: string;
    card_number?: string;
    wallet_validity?: string;
    chip_number?: string;
    id_office_register?: string;
    date_birth: string | Date;
    bloodType?: BloodType;
    blood_donator?: On_Off | null;
    color?: string;
    allergies?: string[];
    preexistingConditions?: string[];
    medicationsInUse?: string[];
    castrated: On_Off;
    dateOfCastration?: string;
    organ_donor?: On_Off;
    size?: string;
    weight?: string;
    pedigree?: On_Off;
    pedigree_registry?: string;
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
    gender: Gender;
    veterinary: DTOProfile
}