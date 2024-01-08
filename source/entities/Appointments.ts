import {
    IGeolocationAppointment,
    ISignatureAppointment,
} from '~/store/slices/appointment-vet/types';
import {
    Anamnesis,
    AppointmentDetails,
    DateConsults,
    DetailsPetConsultation,
    IPayment,
    Treatments,
    TutorPetVet,
    VeterinaryConsultation,
} from '~/types/appointment';
import { DTOProfile } from '~/types/profile';

export class Appointments implements VeterinaryConsultation {
    id: string | null;
    id_pet: string;
    cpf_tutor: string;
    crmv_vet: string;
    cpf_cnpj_vet: string;
    appointment_details: AppointmentDetails;
    dates_consults: DateConsults;
    tutor_pet_vet: TutorPetVet;
    details_pet_consultation: DetailsPetConsultation;
    anamnesis: Anamnesis;
    treatments: Treatments;

    constructor() {
        this.id = '';
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
                blood_donator: 'no',
                blood_type: '',
                castrated: 'no',
                color: '',
                date_birth: '',
                identification_number: '',
                microchip: '',
                name_pet: '',
                organ_donor: '',
                pedigree: 'no',
                pedigree_registry: '',
                race: 'unknown',
                sex: 'unknown',
                size: '',
                specie: 'unknown',
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
            veterinary: {} as DTOProfile,
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
            appointment_geolocation: {} as IGeolocationAppointment,
            appointment_signature: {} as ISignatureAppointment,
            payment: {} as IPayment,
        };
    }

    defineId(id: string | null = null): this {
        this.id = id;
        return this;
    }

    defineIdPet(id_pet: string): this {
        this.id_pet = id_pet;
        return this;
    }

    defineCpfTutor(cpf_tutor: string): this {
        this.cpf_tutor = cpf_tutor;
        return this;
    }

    defineCrmvVet(crmv_vet: string): this {
        this.crmv_vet = crmv_vet;
        return this;
    }

    defineCpfCnpjVet(cpf_cnpj_vet: string): this {
        this.cpf_cnpj_vet = cpf_cnpj_vet;
        return this;
    }

    defineAppointmentSignature(
        appointment_signature: ISignatureAppointment,
    ): this {
        this.appointment_details.appointment_signature = appointment_signature;
        return this;
    }

    defineAppointmentGeolocation(
        appointment_geolocation: IGeolocationAppointment,
    ): this {
        this.appointment_details.appointment_geolocation =
            appointment_geolocation;
        return this;
    }

    definePayment(payment: IPayment): this {
        this.appointment_details.payment = payment;
        return this;
    }

    defineDateConsultation(date_consultation: DateConsults): this {
        this.dates_consults = date_consultation;
        return this;
    }

    defineTutor(tutor: TutorPetVet['tutor']): this {
        this.tutor_pet_vet.tutor = tutor;
        return this;
    }

    definePet(pet: TutorPetVet['pet']): this {
        this.tutor_pet_vet.pet = pet;
        return this;
    }

    defineVeterinary(veterinary: TutorPetVet['veterinary']): this {
        this.tutor_pet_vet.veterinary = veterinary;
        return this;
    }

    defineDetailsPetConsultation(
        details_pet_consultation: DetailsPetConsultation,
    ): this {
        this.details_pet_consultation = details_pet_consultation;
        return this;
    }

    defineAnamnesis(anamnesis: Anamnesis): this {
        this.anamnesis = anamnesis;
        return this;
    }

    defineTreatments(treatments: Treatments): this {
        this.treatments = treatments;
        return this;
    }

    static build(params: VeterinaryConsultation): Appointments {
        return new Appointments()
            .defineId(params?.id ?? null)
            .defineIdPet(params?.id_pet)
            .defineCpfTutor(params?.cpf_tutor)
            .defineCrmvVet(params?.crmv_vet)
            .defineCpfCnpjVet(params?.cpf_cnpj_vet)
            .defineAppointmentSignature(
                params?.appointment_details?.appointment_signature,
            )
            .defineAppointmentGeolocation(
                params?.appointment_details?.appointment_geolocation,
            )
            .definePayment(params?.appointment_details?.payment)
            .defineDateConsultation(params?.dates_consults)
            .defineTutor(params?.tutor_pet_vet?.tutor)
            .definePet(params?.tutor_pet_vet?.pet)
            .defineVeterinary(params?.tutor_pet_vet?.veterinary)
            .defineDetailsPetConsultation(params?.details_pet_consultation)
            .defineAnamnesis(params?.anamnesis)
            .defineTreatments(params?.treatments);
    }
}
