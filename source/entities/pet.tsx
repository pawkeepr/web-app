import { Breed } from "~/store/slices/pets/breedType";
import { Gender, Species } from "~/store/slices/pets/speciesType";
import { GenericSelect, IPetV2 } from "~/types/pet-v2";

export class Pet implements IPetV2 {
    id: string;
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

    constructor() {
        this.id = '';
        this.name_tutor = '';
        this.phone_tutor = '';
        this.contact_tutor = {
            email: '',
            phone: '',
            whatsapp: ''
        };
        this.cpf_tutor = '';
        this.vets_data = [];
        this.location_tutor = {
            country: '',
            zipCode: '',
            state: '',
            city: '',
            neighborhood: '',
            street: '',
            number: '',
            complement: ''
        };
        this.pet_data = {} as any;
        this.health_insurance = {
            name: '',
            type_health: '',
            number_health: '',
            validity: ''
        };
        this.responsible_tutors = {
            name_tutor: '',
            cpf_tutor: ''
        };
    }

    defineID(id: string): this {
        this.id = id;
        return this;
    }

    defineNameTutor(name_tutor: string): this {
        this.name_tutor = name_tutor;
        return this;
    }

    definePhoneTutor(phone_tutor: string): this {
        this.phone_tutor = phone_tutor;
        return this;
    }

    defineContactTutor(contact_tutor: {
        email: string | null;
        phone: string | null
        whatsapp: string | null
    }): this {
        this.contact_tutor = contact_tutor;
        return this;
    }

    defineCpfTutor(cpf_tutor: string): this {
        this.cpf_tutor = cpf_tutor;
        return this;
    }

    defineVetsData(vets_data: string[]): this {
        this.vets_data = vets_data;
        return this;
    }

    defineLocationTutor(location_tutor: {
        country: string | null;
        zipCode: string | null;
        state: string | null;
        city: string | null;
        neighborhood: string | null;
        street: string | null;
        number: string | null;
        complement: string | null;
    }): this {
        this.location_tutor = location_tutor;
        return this;
    }

    definePetData(pet_data: any): this {
        this.pet_data = pet_data;
        return this;
    }

    defineHealthInsurance(health_insurance: {
        name: string | null;
        type_health: string | null;
        number_health: string | null;
        validity: string | null;
    }): this {
        this.health_insurance = health_insurance;
        return this;
    }

    defineResponsibleTutors(responsible_tutors: {
        name_tutor: string | null;
        cpf_tutor: string | null;
    }): this {
        this.responsible_tutors = responsible_tutors;
        return this;
    }

    static build(params: IPetV2): Pet {
        return new Pet()
            .defineID(params.id)
            .defineNameTutor(params.name_tutor)
            .definePhoneTutor(params.phone_tutor)
            .defineContactTutor(params.contact_tutor)
            .defineCpfTutor(params.cpf_tutor)
            .defineVetsData(params.vets_data)
            .defineLocationTutor(params.location_tutor)
            .definePetData({
                ...params.pet_data,
                specie: params.pet_data.specie as any,
                race: params.pet_data.race as any,
                blood_type: params.pet_data.blood_type as any,
                sex: params.pet_data.blood_type as any,
            })
            .defineHealthInsurance(params.health_insurance)
            .defineResponsibleTutors(params.responsible_tutors)
    }
}