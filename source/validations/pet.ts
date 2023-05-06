import { cnpj, cpf } from 'cpf-cnpj-validator';
import * as Yup from "yup";

const validateOwnerEmergencyContact = Yup.object({
    // phoneNumber: Yup.string().matches(/^[\d()-\s]+$/)
    //     .test('valid-phone-number', 'Número de telefone inválido', (value) => {
    //         if (!value) {
    //             return false;
    //         }

    //         // Removendo caracteres não numéricos do número de telefone
    //         const numericValue = value.replace(/\D/g, '');

    //         // Verificando se o número de telefone tem pelo menos 10 dígitos
    //         return numericValue.length === 11;
    //     }),
    document: Yup.string()
        .required('Este campo é obrigatório')
        .transform(value => value.replace(/[^\d]/g, ''))
        .test('cpf-cnpj-validator', 'Documento inválido', value => {
            if (!value) return false;
            return cpf.isValid(value) || cnpj.isValid(value);
        }),
})

const validate = Yup.object({
    name: Yup.string().required("Campo Obrigatório"),
    species: Yup.string().required("Campo Obrigatório"),
    breed: Yup.string().required("Campo Obrigatório"),
    bloodType: Yup.string(),
    ownerEmergencyContact: validateOwnerEmergencyContact,
    dateOfBirth: Yup.string(),
})

export default validate;