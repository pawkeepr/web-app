import { IPet } from "~/types/pet";
import { IHealthInsurance, IMainResponsibleGuardian, IPetV2, ISecondaryTutor, ITutor, PetData } from "~/types/pet-v2";
import { DTOProfile } from "~/types/profile";
import { Contact, Location } from "~/validations/activate";
import { PetInformation } from "./PetInformation";
import { Veterinary } from "./Veterinary";

export class Pet implements IPetV2 {

    id: string | null;
    cpf_tutor: string;
    pet_information: PetData;
    main_responsible_guardian: IMainResponsibleGuardian;
    secondary_responsible_guardian: ISecondaryTutor;
    health_insurance: IHealthInsurance;
    veterinary: DTOProfile;


    private constructor() {
        this.id = '';
        this.cpf_tutor = '';

        this.pet_information = {
            name_pet: '',
            microchip: '',
            identification_number: '',
            race: null,
            specie: null,
            blood_type: '',
            blood_donator: 'no',
            color: '',
            date_birth: '',
            organ_donor: 'no',
            pedigree: 'no',
            pedigree_registry: '',
            sex: null,
            size: '',
            weight: '',
            castrated: 'no',
        };
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
            name: '',
            first_name: '',
            last_name: '',
            url_img: '',
        };
        this.secondary_responsible_guardian = {
            name_tutor: '',
            cpf_tutor: '',
            phone_tutor: '',
            emaiL_tutor: '',
        },
            this.veterinary = {
                cpf_cnpj: '',
                crmv: '',
                name_veterinary: '',
                specialty: '',
                email: '',
                phone: '',
                whatsapp: '',
                country: '',
                state: '',
                city: '',
                neighborhood: '',
                street: '',
                id: '',
            }
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
        const data = PetInformation.build(pet_information)
        this.pet_information = data;
        return this;
    }

    defineTutorInformation(main_responsible_guardian: ITutor): this {
        this.main_responsible_guardian.name = main_responsible_guardian.name;
        this.main_responsible_guardian.first_name = main_responsible_guardian.first_name;
        this.main_responsible_guardian.last_name = main_responsible_guardian.last_name;
        this.main_responsible_guardian.url_img = main_responsible_guardian.url_img;

        return this;
    }

    defineContactTutor(contact: Contact): this {
        // #TODO: deve-se criar uma entidade para main_responsible_guardian.user_information.contact
        this.main_responsible_guardian.contact = contact;
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
    defineVeterinary(veterinary: DTOProfile): this {
        // #TODO: deve-se criar uma entidade para veterinary
        this.veterinary = Veterinary.build(veterinary);
        return this;
    }


    static build(params: IPet): Pet {
        return new Pet()
            .defineID(params.id as string)
            .defineCpfTutor(params.cpf_tutor)
            .definePetInformation({
                blood_donator: params.blood_donator || 'no',
                blood_type: params.bloodType || '',
                color: params.color || '',
                date_birth: params.date_birth as string || '',
                microchip: params.chip_number || '',
                name_pet: params.name,
                organ_donor: params.organ_donor || 'no',
                pedigree: params.pedigree || 'no',
                pedigree_registry: params.pedigree_registry || '',
                race: params.breed,
                sex: params.gender,
                size: params.size || '',
                specie: params.specie,
                weight: params.weight || '',
                castrated: params.castrated || 'no',
                identification_number: ''
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
                name: params.ownerEmergencyContact.name,
                first_name: params.ownerEmergencyContact.name,
                last_name: params.ownerEmergencyContact.name,
                url_img: ''
            })
            .defineVeterinary(params.veterinary)

    }
}