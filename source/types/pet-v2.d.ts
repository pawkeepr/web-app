import { Breed } from "~/store/slices/pets/breedType";
import { Gender, Species } from "~/store/slices/pets/speciesType";

export interface IPetV2 {
    id?: string;
    name_tutor: string
    phone_tutor: string;
    contact_tutor: {
        email: string | null;
        phone: string | null
        whatsapp: string | null
    };
    cpf_tutor: string;
    vets_data: string[];
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
    pet_data: {
        name_pet: string;
        specie: Species | null;
        race: Breed | null;
        sex: Gender | null;
        castrated: string | boolean;
        microchip: string | null;
        identification_number: string | null;
        blood_type: string | null;
        blood_donator: string | null;
        organ_donor: string | null;
    };
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
