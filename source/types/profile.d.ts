import { Contact, UserInformation } from "~/validations/activate";

type Specialty = {
    type: string;
    name_specialty: string;
}
type Location = {
    country: string;
    zipCode: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;
}

export type SpecialtyInformation = {
    specialty: string;
    list_specialty: Specialty[];
    list_service_type: string[];
}

export type ProfileUserInformation = {
    first_name: string;
    last_name: string;
    name: string;
    url_img: string;
    contact: Contact;
    address: Location;
}

export type IProfile = {
    id?: string
    cpf_cnpj: string;
    crmv: string;
    specialty_information: SpecialtyInformation;
    user_information: ProfileUserInformation;
}
