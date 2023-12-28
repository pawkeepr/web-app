import { DTOProfile } from "~/types/profile"

export class Veterinary implements DTOProfile {
    id?: string
    cpf_cnpj: string
    crmv: string
    name_veterinary: string
    specialty: string
    email: string
    phone: string
    whatsapp: string
    country: string
    state: string
    city: string
    neighborhood: string
    street: string 

    private constructor() {
        this.cpf_cnpj = ''
        this.crmv = ''
        this.name_veterinary = ''
        this.specialty = ''
        this.email = ''
        this.phone = ''
        this.whatsapp = ''
        this.country = ''
        this.state = ''
        this.city = ''
        this.neighborhood = ''
        this.street = ''
    }

    defineID(id?: string): this {
        this.id = id;
        return this;
    }

    defineCpfCnpj(cpf_cnpj: string): this {
        this.cpf_cnpj = cpf_cnpj;
        return this;
    }

    defineCrmv(crmv: string): this {
        this.crmv = crmv;
        return this;
    }

    defineNameVeterinary(name_veterinary: string): this {
        this.name_veterinary = name_veterinary;
        return this;
    }

    defineSpecialty(specialty: string): this {
        this.specialty = specialty;
        return this;
    }

    defineEmail(email: string): this {
        this.email = email;
        return this;
    }

    definePhone(phone: string): this {
        this.phone = phone;
        return this;
    }

    defineWhatsapp(whatsapp: string): this {
        this.whatsapp = whatsapp;
        return this;
    }

    defineCountry(country: string): this {
        this.country = country;
        return this;
    }

    defineState(state: string): this {
        this.state = state;
        return this;
    }

    defineCity(city: string): this {
        this.city = city;
        return this;
    }

    defineNeighborhood(neighborhood: string): this {
        this.neighborhood = neighborhood;
        return this;
    }

    defineStreet(street: string): this {
        this.street = street;
        return this;
    }

    static build(values: DTOProfile): Veterinary {
        return new Veterinary()
            .defineID(values.id)
            .defineCpfCnpj(values.cpf_cnpj)
            .defineCrmv(values.crmv)
            .defineNameVeterinary(values.name_veterinary)
            .defineSpecialty(values.specialty)
            .defineEmail(values.email)
            .definePhone(values.phone)
            .defineWhatsapp(values.whatsapp)
            .defineCountry(values.country)
            .defineState(values.state)
            .defineCity(values.city)
            .defineNeighborhood(values.neighborhood)
            .defineStreet(values.street)
    }

}