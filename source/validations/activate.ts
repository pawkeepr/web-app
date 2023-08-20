import { cnpj, cpf } from "cpf-cnpj-validator";
import * as Yup from "yup";

import Address from './address';

const transformTrim = (value: any, originalValue: string) => {
    // Remover espaços em branco extras da string
    return typeof originalValue === "string"
        ? originalValue.trim()
        : originalValue;
};

type Specialty = {
    type: string;
    name_specialty: string;
}

type Contact = {
    email: string;
    phone: string;
    whatsapp: string;
}

type Location = {
    country: string;
    zipCode: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;
}

export type ActivateAccount = {
    firstName: string;
    lastName: string;
    crmv: string;
    cpf_cnpj: string;
    specialty: string;
    serviceType: string[];
    type: number;
    list_specialty: Specialty[];
    list_service_type: string[];
    contact: Contact;
    location: Location;
}

const validate = Yup.object().shape({
    firstName: Yup.string()
        .transform(transformTrim)
        .min(2, "O nome deve ter pelo menos 2 caracteres")
        .max(50, "O nome deve ter no máximo 50 caracteres")
        .required("O campo de nome é obrigatório"),
    lastName: Yup.string()
        .transform(transformTrim)
        .min(2, "O sobrenome deve ter pelo menos 2 caracteres")
        .max(155, "O sobrenome deve ter no máximo 50 caracteres")
        .required("O campo de sobrenome é obrigatório"),
    crmv: Yup.string()
        .matches(/^[A-Z]{2}\d{4,6}$/, "CRMV inválido. Exemplo: SP12345")
        .required("O Campo CRMV é obrigatório"),
    speciality: Yup.string().required("O campo especialidade é obrigatório"),
    serviceType: Yup.array().min(1, "Selecione pelo menos um tipo de atendimento").required(),
    type: Yup.number()
        .oneOf([RULES.ADMIN, RULES.VETERINARY, RULES.TUTOR]),
    list_specialty: Yup.array().of(
        Yup.object().shape({
            type: Yup.string().required("O campo especialidade é obrigatório"),
            name_specialty: Yup.string().required("O campo especialidade é obrigatório"),
        }),
    ),
    list_service_type: Yup.array().of(
        Yup.string().required("O campo especialidade é obrigatório"),
    ),
    contact: Yup.object().shape({
        email: Yup.string()
            .email("O email deve ser válido")
            .required("O campo de email é obrigatório"),
        phone: Yup.string()
            .matches(/^[\d()-\s]+$/)
            .required(),
        whatsapp: Yup.string()
            .matches(/^[\d()-\s]+$/)
            .required(),
    }),
    cpf_cnpj: Yup.string()
        .required("Este campo é obrigatório")
        .transform((value) => value.replace(/[^\d]/g, ""))
        .test("cpf-cnpj-validator", "Documento inválido", (value) => {
            if (!value) return false;
            return cpf.isValid(value) || cnpj.isValid(value);
        }),
    location: Address
});


export default validate;
