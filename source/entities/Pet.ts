import { IPet } from "~/types/pet";
import { IHealthInsurance, IPetV2, ISecondaryTutor, PetData } from "~/types/pet-v2";
import { Contact, IMainTutor, Location, UserInformation } from "~/validations/activate";

export class Pet implements IPetV2 {

    id: string | null;
    cpf_tutor: string;
    pet_information: PetData;
    main_responsible_guardian: {
        user_information: UserInformation;
        address: Location
    };
    secondary_responsible_guardian: ISecondaryTutor;
    health_insurance: IHealthInsurance;


    constructor() {
        this.id = '';
        this.cpf_tutor = '';

        this.pet_information = {} as any;
        this.health_insurance = {
            name: '',
            type_health: '',
            number_health: '',
            validity: ''
        };
        this.main_responsible_guardian = {
            address: {
                city: '',
                complement: '',
                country: '',
                neighborhood: '',
                number: '',
                state: '',
                street: '',
                zipCode: ''
            },
            user_information: {
                contact: {
                    email: '',
                    phone: '',
                    whatsapp: '',
                    facebook: '',
                    instagram: '',
                    linkedIn: '',
                    twitter: '',
                    youtube: ''
                },
                first_name: '',
                last_name: '',
                url_img: ''
            }
        };
        this.secondary_responsible_guardian = {
            name_tutor: '',
            cpf_tutor: '',
            phone_tutor: '',
            email_tutor: ''
        };
    }

    defineID(id: string | null = null): this {
        this.id = id;
        return this;
    }

    defineCpfTutor(cpf_tutor: string): this {
        this.cpf_tutor = cpf_tutor;
        return this;
    }

    definePetInformation(pet_information: PetData): this {
        // #TODO: deve-se criar uma entidade para pet_information
        this.pet_information = pet_information;
        return this;
    }

    defineTutorInformation(main_responsible_guardian: IMainTutor): this {
        this.main_responsible_guardian.user_information = {
            ...this.main_responsible_guardian.user_information,
            ...main_responsible_guardian
        };
        return this;
    }

    defineContactTutor(contact: Contact): this {
        // #TODO: deve-se criar uma entidade para main_responsible_guardian.user_information.contact
        this.main_responsible_guardian.user_information.contact = contact;
        return this;
    }

    defineLocationTutor(location: Partial<Location>): this {
        // #TODO: deve-se criar uma entidade para endereço
        this.main_responsible_guardian.address = location as Location;
        return this;
    }

    defineHealthInsurance(health_insurance: IHealthInsurance): this {
        // #TODO: deve-se criar uma entidade para health_insurance
        this.health_insurance = health_insurance;
        return this;
    }

    defineSecondaryTutor(secondary_responsible_guardian: ISecondaryTutor): this {
        // #TODO: deve-se criar uma entidade para secondary_responsible_guardian
        this.secondary_responsible_guardian = secondary_responsible_guardian;
        return this;
    }


    static build(params: IPet): Pet {
        return new Pet()
            .defineID(params.id as string)
            .defineCpfTutor(params.cpf_tutor)
            .definePetInformation({
                blood_donator: params.blood_donator || false,
                blood_type: params.bloodType,
                color: params.color || '',
                date_birth: params.date_birth as string,
                microchip: params.chip_number || '',
                name_pet: params.name,
                organ_donor: params.organ_donor || 'no',
                pedigree: params.pedigree || false,
                pedigree_registry: params.pedigree_registry || '',
                race: params.breed,
                sex: params.gender,
                size: params.size || '',
                specie: params.specie,
                weight: params.weight || ''
            })
            .defineContactTutor({
                email: params.ownerEmergencyContact.email,
                facebook: '',
                instagram: '',
                linkedIn: '',
                phone: params.ownerEmergencyContact.phone,
                twitter: '',
                whatsapp: params.ownerEmergencyContact.whatsapp || '',
                youtube: ''
            })
            .defineHealthInsurance({
                name: params.health_insurance || '',
                number_health: params.card_number || '',
                type_health: params.plain_type || '',
                validity: params.wallet_validity || ''
            })
            .defineLocationTutor({
                city: params.ownerEmergencyContact.address?.city || '',
                complement: params.ownerEmergencyContact.address?.complement || '',
                country: params.ownerEmergencyContact.address?.country || '',
                neighborhood: params.ownerEmergencyContact.address?.neighborhood || '',
                number: params.ownerEmergencyContact.address?.number || '',
                state: params.ownerEmergencyContact.address?.state || '',
                street: params.ownerEmergencyContact.address?.street || '',
                zipCode: params.ownerEmergencyContact.address?.zipCode || ''
            })
            .defineTutorInformation({
                first_name: params.ownerEmergencyContact.name,
                last_name: params.ownerEmergencyContact.lastName || '',
                url_img: ''
            })
    }
}