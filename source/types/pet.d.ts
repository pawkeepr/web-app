import { Breed } from '~/store/slices/pets/breedType';
import { Gender, Species } from '~/store/slices/pets/speciesType';
import { On_Off } from './pet-v2';
import { DTOProfile } from './profile';
import { ITutor } from './tutor';

export type IPet = {
    id?: string;
    name: string;
    cpf_tutor: string;
    specie: Species;
    breed: Breed;
    plain_type?: string;
    microchip?: string
    identification_number?: string;
    health_insurance?: string;
    card_number?: string;
    wallet_validity?: string;
    chip_number?: string;
    date_birth: string | Date;
    bloodType?: BloodType;
    blood_donator?: On_Off | null;
    color?: string;
    allergies?: string[];
    medicationsInUse?: string[];
    castrated: On_Off;
    dateOfCastration?: string;
    organ_donor?: On_Off;
    size?: string;
    weight?: string;
    pedigree?: On_Off;
    pedigree_registry?: string;
    diet?: Diet;
    ownerEmergencyContact: ITutor;
    avatar?: string;
    created_at?: string;
    updated_at?: string;
    gender: Gender;
    veterinary: DTOProfile
}