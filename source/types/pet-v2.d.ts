import { Breed } from "~/store/slices/pets/breedType";
import { Gender, Species } from "~/store/slices/pets/speciesType";

type GenericSelect = {
    label: string;
    value: string;
}

export interface PetData {
    name_pet: string;
    specie: Species | null | GenericSelect;
    race: Breed | null | GenericSelect;
    sex: Gender | null | GenericSelect;
    castrated: boolean | null;
    microchip: string | null;
    identification_number: string | null;
    blood_type: string | null | GenericSelect;
    blood_donator: string | null;
    organ_donor: string | null;
    date_birth: string | null;
}

export interface IPetV2 {
    id?: string;
    name_tutor: string
    phone_tutor: string;
    contact_tutor: {
        email: string | null;
        phone: string | null
        whatsapp: string | null
    };
    has_second_tutor?: boolean;
    cpf_tutor: string;
    vets_data: {
        name_vet: string | null;
        phone_vet: string | null;
        email_vet: string | null;
        crmv_vet: string | null;
        cpf_cnpj_vet: string | null;
    };
    location_tutor: {
        country: string | null;
        zipCode: string | null;
        state: string | null;
        city: string | null;
        neighborhood: string | null;
        street: string | null;
        number: string | null;
        complement: string | null;
    };
    pet_data: PetData;
    health_insurance: {
        name: string | null;
        type_health: string | null;
        number_health: string | null;
        validity: string | null;
    };
    responsible_tutors: {
        name_tutor: string | null;
        cpf_tutor: string | null;
    };
}
