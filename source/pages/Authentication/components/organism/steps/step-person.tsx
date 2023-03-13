

import type { InitialStateSignUp } from '../../../SignUp';

import { cpf } from 'cpf-cnpj-validator';
import { useFormikContext } from 'formik';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FieldControl from '~/Components/molecules/field-control';

import { cnpj } from 'cpf-cnpj-validator';
import { useMemo } from 'react';
import MaskedInput from 'react-input-mask';

import validatePerson from '~/validations/person';
import { StepProps } from './types';

const StepSignUp02 = ({ nextStep, prevStep, ...rest }: StepProps) => {

    const { values, setFieldValue } = useFormikContext<InitialStateSignUp>()
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
        <div className="p-lg-5 p-4">
            <div>
                <h5 className="text-primary">Criar Conta</h5>
                <p className="text-muted">Crie uma conta PawKeeprs gratuita agora e aproveite.</p>
            </div>

            <div className="mt-4">


                <Container className="d-flex flex-column">

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
                        <button className="btn btn-success w-40 m-1" type="button" onClick={prevStep}>Anterior</button>
                        <button className="btn btn-success w-40 m-1" type="button" onClick={nextStep} disabled={!requiredFieldsFilled}>Próximo</button>
                    </div>
                </Container>

            </div>
        </div>
    )
}

export default StepSignUp02