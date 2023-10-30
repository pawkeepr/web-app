import { ContactTutor, HealthInsurance, IAnamnesisAppointment, IAppointmentVet, IDates_consultsAppointment, IDental_treatmentAppointment, IExamsAppointment, IGeolocationAppointment, IInfo_required, IMedicineAppointment, INutritionsAppointment, IPaymentsAppointment, IPetAppointment, ISignatureAppointment, IStatusAppointment, ITests_fastsAppointment, ITutorAppointment, IVaccineAppointment, IVetAppointment, IWell_beingAppointment, IllnessesAppointment, LocationTutor, ResponsibleTutors, VetsData } from "~/store/slices/appointment-vet/types"

export class Appointments implements IAppointmentVet {
    id: string | null
    id_pet: string
    pet_data: IPetAppointment
    cpf_tutor: string
    tutor_data: ITutorAppointment
    crmv_vet: string
    cpf_cnpj_vet: string
    vet_data: IVetAppointment
    medicines: IMedicineAppointment[]
    anamnesis: IAnamnesisAppointment
    vaccines: IVaccineAppointment[]
    exams: IExamsAppointment[]
    nutritions: INutritionsAppointment[]
    illnesses: IllnessesAppointment[]
    info_required: IInfo_required
    payments: IPaymentsAppointment
    dates_consults: IDates_consultsAppointment
    appointment_status: IStatusAppointment
    appointment_signature: ISignatureAppointment
    appointment_geolocation: IGeolocationAppointment
    tests_fasts: ITests_fastsAppointment
    dental_treatment: IDental_treatmentAppointment
    well_being: IWell_beingAppointment
    vets_data: VetsData[]
    name_tutor: string
    contact_tutor: ContactTutor
    location_tutor: LocationTutor
    responsible_tutors: ResponsibleTutors
    health_insurance: HealthInsurance

    constructor() {
        this.id = null;
        this.id_pet = "";
        this.pet_data = {} as any;
        this.cpf_tutor = "";
        this.tutor_data = {} as any;
        this.crmv_vet = "";
        this.cpf_cnpj_vet = "";
        this.vet_data = {} as any;
        this.medicines = [] as any;
        this.anamnesis = {} as any;
        this.vaccines = [] as any;
        this.exams = [] as any;
        this.nutritions = [] as any;
        this.illnesses = [] as any;
        this.info_required = {} as any;
        this.payments = {} as any;
        this.dates_consults = {} as any;
        this.appointment_status = {} as any;
        this.appointment_signature = {} as any;
        this.appointment_geolocation = {} as any;
        this.tests_fasts = [] as any;
        this.dental_treatment = {} as any;
        this.well_being = {} as any;
        this.vets_data = [] as any;
        this.name_tutor = "";
        this.contact_tutor = {} as any;
        this.location_tutor = {} as any;
        this.responsible_tutors = {} as any;
        this.health_insurance = {} as any;
    }


    defineId(id: string | null = null): this {
        this.id = id;
        return this;
    }

    defineIdPet(id_pet: string): this {
        this.id_pet = id_pet;
        return this;
    }

    definePetData(pet_data: IPetAppointment): this {

        this.pet_data = pet_data;
        return this;
    }

    defineCpfTutor(cpf_tutor: string): this {
        this.cpf_tutor = cpf_tutor;
        return this;
    }

    defineTutorData(tutor_data: ITutorAppointment): this {
        this.tutor_data = tutor_data;
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

    defineVetData(vet_data: IVetAppointment): this {
        this.vet_data = vet_data;
        return this;
    }

    defineMedicines(medicines: IMedicineAppointment[]): this {
        this.medicines = medicines;
        return this;
    }

    defineAnamnesis(anamnesis: IAnamnesisAppointment): this {
        this.anamnesis = anamnesis;
        return this;
    }

    defineVaccines(vaccines: IVaccineAppointment[]): this {
        this.vaccines = vaccines;
        return this;
    }

    defineExams(exams: IExamsAppointment[]): this {
        this.exams = exams;
        return this;
    }

    defineNutritions(nutritions: INutritionsAppointment[]): this {
        this.nutritions = nutritions;
        return this;
    }

    defineIllnesses(illnesses: IllnessesAppointment[]): this {
        this.illnesses = illnesses;
        return this;
    }

    defineInfoRequired(info_required: IInfo_required): this {
        this.info_required = info_required;
        return this;
    }

    definePayments(payments: IPaymentsAppointment): this {
        this.payments = payments;
        return this;
    }

    defineDatesConsults(dates_consults: IDates_consultsAppointment): this {
        this.dates_consults = dates_consults;
        return this;
    }

    defineAppointmentStatus(appointment_status: IStatusAppointment): this {
        this.appointment_status = appointment_status;
        return this;
    }

    defineAppointmentSignature(appointment_signature: ISignatureAppointment): this {
        this.appointment_signature = appointment_signature;
        return this;
    }

    defineAppointmentGeolocation(appointment_geolocation: IGeolocationAppointment): this {
        this.appointment_geolocation = appointment_geolocation;
        return this;
    }

    defineTestsFasts(tests_fasts: ITests_fastsAppointment): this {
        this.tests_fasts = tests_fasts;
        return this;
    }

    defineDentalTreatment(dental_treatment: IDental_treatmentAppointment): this {
        this.dental_treatment = dental_treatment;
        return this;
    }

    defineWellBeing(well_being: IWell_beingAppointment): this {
        this.well_being = well_being;
        return this;
    }

    static build(params: IAppointmentVet): Appointments {
        return new Appointments()
            .defineAnamnesis(params.anamnesis)
            .defineAppointmentGeolocation(params.appointment_geolocation)
            .defineAppointmentSignature(params.appointment_signature)
            .defineAppointmentStatus(params.appointment_status)
            .defineCpfCnpjVet(params.cpf_cnpj_vet)
            .defineCpfTutor(params.cpf_tutor)
            .defineCrmvVet(params.crmv_vet)
            .defineDatesConsults(params.dates_consults)
            .defineDentalTreatment(params.dental_treatment)
            .defineExams(params.exams)
            .defineId(params.id)
            .defineIdPet(params.id_pet)
            .defineIllnesses(params.illnesses)
            .defineInfoRequired(params.info_required)
            .defineMedicines(params.medicines)
            .defineNutritions(params.nutritions)
            .definePayments(params.payments)
            .definePetData(params.pet_data)
            .defineTestsFasts(params.tests_fasts)
            .defineTutorData(params.tutor_data)
            .defineVaccines(params.vaccines)
            .defineVetData(params.vet_data)
            .defineWellBeing(params.well_being)

    }
};