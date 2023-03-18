


import { cnpj, cpf } from 'cpf-cnpj-validator';
import { useFormikContext } from 'formik';
import Form from 'react-bootstrap/Form';
import FieldControl from '~/Components/molecules/field-control';

import { useMemo } from 'react';
import MaskedInput from 'react-input-mask';

import BtnCancel from '~/Components/atoms/btn/btn-cancel';
import BtnSuccess from '~/Components/atoms/btn/btn-success';
import { AccountSignUp } from '~/store/auth/register/types';
import validatePerson from '~/validations/person';
import Container from '../../template/container';
import { StepProps } from './types';

const StepSignUp02 = ({ nextStep, prevStep, ...rest }: StepProps) => {

    const { values, setFieldValue } = useFormikContext<AccountSignUp>()
    const { person } = values
    const { document } = person

    const isValidCnpj = useMemo(() => cnpj.isValid(document), [document])

    const requiredFieldsFilled = useMemo((): boolean => {
        const isValid = validatePerson.isValidSync(person);
        return isValid
    }, [person])

    const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setFieldValue('person.lastName', value)
    }

    const mask = useMemo(() => {
        // somente os números
        const numbers = document.replace(/\D/g, '')

        // verifica se é CPF ou CNPJ
        if (numbers.length === 11 && cpf.isValid(numbers)) return '999.999.999-99'

        return numbers.length >= 11 ? '99.999.999/9999-99' : '999.999.999-99'
    }, [document])

    return (
        <Container>
            <div className="container d-flex flex-column">

                <FieldControl
                    label='Nome Completo'
                    name="person.firstName"
                    aria-label="firstName"
                    className="form-control"
                    placeholder="Nome"
                    required
                    disabledError
                >

                    <Form.Control
                        type="text"
                        name="person.lastName"
                        aria-label="lastName"
                        placeholder="Sobrenome"
                        onChange={onChangeLastName}
                        required
                        className='ms-1 w-50'

                    />

                </FieldControl>

                <FieldControl
                    label='CPF/CNPJ'
                    name="person.document"
                    aria-label="document"
                    className="form-control"
                    placeholder="CPF/CNPJ"
                    component={MaskedInput as any}
                    mask={mask}
                    required
                />
                {isValidCnpj &&
                    (<FieldControl
                        label='Companhia'
                        name="person.company"
                        aria-label="company"
                        className="form-control"
                        placeholder="Nome da Empresa"
                        required
                        disabledError
                    />)}
                <FieldControl
                    className="form-control"
                    type="text"
                    label="CRMV"
                    name="person.crmv"
                    placeholder="Digite o seu CRMV"
                    component={MaskedInput as any}
                    mask={"aa999999"}
                    maskChar={null}
                    required
                />
                <FieldControl
                    className="form-control"
                    type="text"
                    label="Telefone/Celular"
                    name="person.phoneNumber"
                    placeholder="Digite o seu Número de Telefone"
                    component={MaskedInput as any}
                    mask={"(99) 99999-9999"}
                    maskChar={null}
                    required
                />
                <div className="mt-4 d-flex justify-content-center">
                    <BtnCancel onClick={prevStep} label="Anterior" className="m-1" />
                    <BtnSuccess label="Próximo" className="m-1" onClick={nextStep} disabled={!requiredFieldsFilled} />
                </div>
            </div>

        </Container>
    )
}

export default StepSignUp02