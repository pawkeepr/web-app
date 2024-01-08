import { IAppointmentVet } from '~/store/slices/appointment-vet/types';
import {
    Anamnesis,
    AppointmentDetails,
    DateConsults,
    DetailsPetConsultation,
    Treatments,
    TutorPetVet,
    VeterinaryConsultation,
} from '~/types/appointment';

export class Appointments implements VeterinaryConsultation {
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

    constructor() {
        this.id_pet = '';
        this.cpf_tutor = '';
        this.crmv_vet = '';
        this.cpf_cnpj_vet = '';
        this.dates_consults = {
            date_consultation: '',
            time_consultation: '',
            additional_remarks: '',
            reason_consultation: '',
            type_consultation: '',
        };
        this.tutor_pet_vet = {
            pet: {
                blood_donator: '',
                blood_type: '',
                castrated: '',
                color: '',
                date_birth: '',
                identification_number: '',
                microchip: '',
                name_pet: '',
                organ_donor: '',
                pedigree: '',
                pedigree_registry: '',
                race: '',
                sex: '',
                size: '',
                specie: '',
                weight: '',
            },
            tutor: {
                address: {
                    city: '',
                    complement: '',
                    country: '',
                    neighborhood: '',
                    number: '',
                    state: '',
                    street: '',
                    zipCode: '',
                },
                contact: {
                    email: '',
                    facebook: '',
                    instagram: '',
                    linkedIn: '',
                    phone: '',
                    whatsapp: '',
                    twitter: '',
                    youtube: '',
                },
                first_name: '',
                last_name: '',
                name: '',
                url_img: '',
            },
            veterinary: {
                address: {} as any,
                contact: {} as any,
                first_name: '',
                last_name: '',
                name: '',
                url_img: '',
            },
        };
        this.details_pet_consultation = {
            age: '',
            height: '',
            imc: '',
            length: '',
            type_weight: '',
            weight: '',
        };
        this.anamnesis = {
            note: '',
            questions_anamnesis: [],
        };
        this.treatments = {
            note: '',
            questions_treatment: [],
        };
        this.appointment_details = {
            appointment_geolocation: {} as any,
            appointment_signature: {} as any,
            payment: {} as any,
        };
    }

    static build(params: IAppointmentVet): Appointments {
        return new Appointments();
    }
}
