import {
    TypeProfile,
    type Contact,
    type DTOProfile,
    type IProfile,
    type Location,
} from '~/types/profile'

export class Veterinary implements DTOProfile {
    id: string
    cpf_cnpj: string
    crmv: string
    name: string
    type_profile: TypeProfile
    specialty: string
    url_img: string
    contact: Contact
    address: Location
    first_name: string
    last_name: string

    private constructor(id: string) {
        this.id = id
        this.cpf_cnpj = ''
        this.type_profile = TypeProfile.VETERINARY
        this.crmv = ''
        this.name = ''
        this.specialty = ''
        this.url_img = ''
        this.contact = {
            email: '',
            phone: '',
            facebook: '',
            instagram: '',
            linkedIn: '',
            twitter: '',
            whatsapp: '',
            youtube: '',
        }
        this.address = {
            city: '',
            complement: '',
            country: '',
            neighborhood: '',
            number: '',
            state: '',
            street: '',
            zipCode: '',
        }
        this.first_name = ''
        this.last_name = ''
    }

    defineId(id: string): Veterinary {
        this.id = id
        return this
    }

    defineCpfCnpj(cpf_cnpj: string): Veterinary {
        this.cpf_cnpj = cpf_cnpj
        return this
    }

    defineCrmv(crmv: string): Veterinary {
        this.crmv = crmv
        return this
    }

    defineName(name: string): Veterinary {
        this.name = name
        return this
    }

    defineSpecialty(specialty: string): Veterinary {
        this.specialty = specialty
        return this
    }

    defineUrlImg(url_img: string): Veterinary {
        this.url_img = url_img
        return this
    }

    defineContact(contact: Contact): Veterinary {
        this.contact = contact
        return this
    }

    defineAddress(address: Location): Veterinary {
        this.address = address
        return this
    }

    private update(params: DTOProfile) {
        return this.defineId(params.id)
            .defineAddress(params.address)
            .defineContact(params.contact)
            .defineCpfCnpj(params.cpf_cnpj as string)
            .defineCrmv(params.crmv as string)
            .defineName(params.name)
            .defineSpecialty(params.specialty as string)
            .defineUrlImg(params.url_img)
    }

    static build(profile: IProfile | DTOProfile): Veterinary {
        const veterinary = new Veterinary(profile.id as string)

        if ((profile as IProfile).user_information) {
            const casted_profile = profile as IProfile
            const user_information = casted_profile.user_information
            const veterinary_information = casted_profile.veterinary_information

            return veterinary.update({
                ...user_information,
                ...veterinary_information,
                id: profile.id as string,
            })
        }

        return veterinary
            .defineId(profile.id as string)
            .update(profile as DTOProfile)
    }
}
