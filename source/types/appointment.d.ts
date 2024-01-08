import { Contact } from "~/validations/activate";
import { Address } from "~/validations/address";

export interface VeterinaryConsultation {
    id_pet: string;
    cpf_tutor: string;
    crmv_vet: string;
    cpf_cnpj_vet: string;
    dates_consults: DateConsults;
    tutor_pet_vet: TutorPetVet;
    details_pet_consultation: DetailsPetConsultation;
    anamnesis: Anamnesis;
    treatments: Treatments;
    appointment_details: AppointmentDetails;
}

interface DateConsults {
    date_consultation: string;
    time_consultation: string;
    type_consultation: string;
    reason_consultation: string;
    additional_remarks: string;
}

interface TutorPetVet {
    tutor: Person;
    pet: Pet;
    veterinary: Person;
}

interface Person {
    first_name: string;
    last_name: string;
    name: string;
    url_img: string;
    contact: Contact;
    address: Address;
}

interface Pet {
    name_pet: string;
    microchip: string;
    identification_number: string;
    specie: string;
    race: string;
    blood_type: string;
    blood_donator: string;
    organ_donor: string;
    sex: string;
    date_birth: string;
    color: string;
    size: string;
    weight: string;
    castrated: string;
    pedigree: string;
    pedigree_registry: string;
}

interface DetailsPetConsultation {
    age: string;
    height: string;
    length: string;
    weight: string;
    type_weight: string;
    imc: string;
}

export interface Anamnesis {
    questions_anamnesis: QuestionAnamnesis[];
    note: string;
}

interface QuestionAnamnesis {
    type_anamnesis: string;
    name_anamnesis: string;
    notes_anamnesis: string;
    list_notes_anamnesis: string[];
    options_anamnesis: string;
    logical_list_default_anamnesis: string;
}

export interface Treatments {
    questions_treatment: QuestionTreatment[];
    note: string;
}

interface QuestionTreatment {
    type_treatment: string;
    name_treatment: string;
    notes_treatment: string;
    list_notes_treatment: string[];
    options_anamnesis: string;
    logical_list_default_anamnesis: string;
    value_coin_treatment: string;
    coin_treatment: string;
}

interface AppointmentDetails {
    payment: Payment;
    appointment_signature: AppointmentSignature;
    appointment_geolocation: AppointmentGeolocation;
}

interface Payment {
    form_payment: string;
    value_payment: string;
    coin: string;
    number_installments: string;
    status_payment: string;
    date_payment: string;
}

interface AppointmentSignature {
    signature_data: string;
    date_signature: string;
    type_signature: string;
    status_signature: string;
    ip_address: string;
    browser_device: string;
    operational_system: string;
}

interface AppointmentGeolocation {
    latitude: string;
    longitude: string;
    precision: string;
    altitude: string;
    speed: string;
    heading: string;
    date_geolocation: string;
}
