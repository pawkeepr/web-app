import * as Yup from 'yup';

const transformTrim = (value: any, originalValue: string) => {
    // Remover espaços em branco extras da string
    return typeof originalValue === 'string' ? originalValue.trim() : originalValue;
}

const schema = Yup.object().shape({
    street: Yup.string()
        .transform(transformTrim)
        .required('O campo Rua é obrigatório'),
    number: Yup.string()
        .transform(transformTrim)
        .required('O campo Número é obrigatório'),
    complement: Yup.string().transform(transformTrim),
    neighborhood: Yup.string()
        .transform(transformTrim)
        .required('O campo Bairro é obrigatório'),
    city: Yup.string()
        .transform(transformTrim).required('O campo Cidade é obrigatório'),
    state: Yup.string()
        .max(3, 'O campo Estado deve ter no max 3 caracteres')
        .min(2, 'O campo Estado deve ter no min 2 caracteres')
        .required('O campo Estado é obrigatório'),
    zipCode: Yup.string()
        .matches(/^[0-9]{5}-[0-9]{3}$/, 'O campo CEP deve ter o formato 00000-000')
        .required('O campo CEP é obrigatório'),
    country: Yup.string()
});

export type Address = Yup.InferType<typeof schema>;

export default schema;
