import type { IPet } from '~/types/pet'
import type {
    IMainResponsibleGuardianSimplified,
    IPetV2Simplified,
    PetData,
    PetDataSimplified,
} from '~/types/pet-v2'
import type { DTOProfile } from '~/types/profile'
import { Veterinary } from './Veterinary'

export class PetSimplified implements IPetV2Simplified {
    id?: string | null | undefined
    cpf_tutor: string
    pet_information: PetDataSimplified
    main_responsible_guardian: IMainResponsibleGuardianSimplified
    veterinary: DTOProfile

    private constructor() {
        this.id = ''
        this.cpf_tutor = ''

        this.pet_information = {
            name_pet: '',
            race: 'unknown',
            specie: 'unknown',
            date_birth: '',
            sex: 'unknown',
            castrated: 'no',
        }

        this.main_responsible_guardian = {
            city: '',
            country: '',
            email: '',
            first_name: '',
            cpf_cnpj: '',
            last_name: '',
            neighborhood: '',
            phone: '',
            state: '',
            street: '',
            whatsapp: '',
        }

        this.veterinary = {
            cpf_cnpj: '',
            crmv: '',
            specialty: '',
            name: '',
            first_name: '',
            last_name: '',
            url_img: '',
            id: '',
            contact: {
                email: '',
                facebook: '',
                instagram: '',
                linkedIn: '',
                phone: '',
                twitter: '',
                whatsapp: '',
                youtube: '',
            },
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
        }
    }

    defineID(id: string | null = null): this {
        this.id = id
        return this
    }

    defineCpfTutor(cpf_tutor: string): this {
        this.cpf_tutor = cpf_tutor
        return this
    }

    definePetInformation(pet_information: PetData): this {
        // #TODO: deve-se criar uma entidade para pet_information
        this.pet_information = pet_information
        return this
    }

    defineVeterinary(veterinary: DTOProfile): this {
        // #TODO: deve-se criar uma entidade para veterinary
        this.veterinary = Veterinary.build(veterinary)
        return this
    }

    defineTutorInformation(
        main_responsible_guardian: IMainResponsibleGuardianSimplified,
    ): this {
        this.main_responsible_guardian = main_responsible_guardian
        return this
    }

    static build(params: IPet): PetSimplified {
        return new PetSimplified()
            .defineID(params.id as string)
            .definePetInformation({
                id_pet: params.id as string,
                blood_donator: params.blood_donator || 'no',
                blood_type: params.bloodType || '',
                color: params.color || '',
                date_birth: (params.date_birth as string) || '',
                microchip: params.chip_number || '',
                name_pet: params.name,
                organ_donor: params.organ_donor || 'no',
                pedigree: params.pedigree || 'no',
                pedigree_registry: params.pedigree_registry || '',
                race: params.race,
                sex: params.sex,
                size: params.size || '',
                specie: params.specie,
                weight: params.weight || '',
                castrated: params.castrated || 'no',
                identification_number: '',
            })
            .defineTutorInformation({
                cpf_cnpj: params.ownerEmergencyContact?.cpf_cnpj,
                city: params.ownerEmergencyContact?.address?.city || '',
                country: params.ownerEmergencyContact?.address?.country || '',
                neighborhood:
                    params.ownerEmergencyContact?.address?.neighborhood || '',
                state: params.ownerEmergencyContact?.address?.state || '',
                street: params.ownerEmergencyContact?.address?.street || '',
                email: params.ownerEmergencyContact?.email,
                phone: params.ownerEmergencyContact?.phone,
                whatsapp: params.ownerEmergencyContact?.whatsapp || '',
                first_name: params.ownerEmergencyContact?.first_name as string,
                last_name: params.ownerEmergencyContact?.last_name as string,
            })
            .defineVeterinary(params.veterinary)
    }
}
