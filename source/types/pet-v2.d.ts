import { Breed } from "~/store/slices/pets/breedType";
import { Gender, Species } from "~/store/slices/pets/speciesType";

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
    blood_donator: string | null;
    sex: Gender | null | GenericSelect;
    organ_donor: string | null;
    date_birth: string | null;
    color: string | null,
    size: string | null ,
    weight: string | null,
    pedigree: boolean | null;
    pedigree_registry: string | null;
}

export interface IPetV2 {
    id?: string | null;
    cpf_tutor: string;
    pet_information: PetData;
    main_responsible_guardian:  {
        user_information: UserInformation;
        adress: Location;
    };
    secondary_responsible_guardian: {
        name_tutor: string | null;
        cpf_tutor: string | null;
        phone_tutor: string | null;
        email_tutor: string | null;
    };
    health_insurance: {
        name: string | null;
        type_health: string | null;
        number_health: string | null;
        validity: string | null;
    };
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