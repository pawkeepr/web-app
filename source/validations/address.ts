import * as Yup from 'yup';

const validate = Yup.object().shape({
    street: Yup.string().required('Este campo é obrigatório'),
    number: Yup.string().required('Este campo é obrigatório'),
    complement: Yup.string(),
    neighborhood: Yup.string().required('Este campo é obrigatório'),
    city: Yup.string().required('Este campo é obrigatório'),
    state: Yup.string().required('Este campo é obrigatório'),
    zipCode: Yup.string().required('Este campo é obrigatório'),
})

export default validate;