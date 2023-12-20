import { Breed } from "~/store/slices/pets/breedType";
import { Gender, Species } from "~/store/slices/pets/speciesType";
import { IMainTutor, Location, UserInformation } from "~/validations/activate";

type GenericSelect = {
    label: string;
    value: string;
}

export interface PetData {
    name_pet: string;
    microchip: string | null;
    identification_number?: string | null;
    specie: Species | null | GenericSelect;
    race: Breed | null | GenericSelect;
    castrated?: boolean | null;
    blood_type: string | null | GenericSelect;
    blood_donator: boolean | null;
    sex: Gender | null | GenericSelect;
    organ_donor: string | null;
    date_birth: string | null;
    color: string | null,
    size: string | null,
    weight: string | null,
    pedigree: boolean | null;
    pedigree_registry: string | null;
}

export type IHealthInsurance = {
    name: string | null;
    type_health: string | null;
    number_health: string | null;
    validity: string | null;
};

export type ISecondaryTutor = {
    name_tutor: string | null;
    cpf_tutor: string | null;
    phone_tutor: string | null;
    email_tutor: string | null;
}

export type IMainResponsibleGuardian = {
    user_information: UserInformation;
    address: Location;
} & IMainTutor;

export interface IPetV2 {
    id?: string | null;
    cpf_tutor: string;
    pet_information: PetData;
    main_responsible_guardian: IMainResponsibleGuardian
    secondary_responsible_guardian: ISecondaryTutor;
    health_insurance: IHealthInsurance
}


export type IPetV2Data = {
    id: string
    name_pet: string;
    microchip: string;
    identification_number: string;
    specie: string;
    race: string;
    blood_type: string;
    blood_donator: string;
    organ_donor: string;
    sex: string;
    castrated: boolean;
    date_birth: string;
}