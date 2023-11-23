
type Specialty = {
    type: string;
    name_specialty: string;
}

type Contact = {
    email: string;
    phone: string;
    whatsapp: string;
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

export type IProfile = {
    id?: string
    firstName: string;
    lastName: string;
    crmv: string;
    cpf_cnpj: string;
    specialty: string;
    list_service_type: string[];
    list_specialty: Specialty[];
    type: number;
    contact: Contact;
    location: Location;
}