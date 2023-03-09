

import type { InitialStateSignUp } from '../../../SignUp';

import { useFormikContext } from 'formik';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FieldControl from '~/Components/molecules/field-control';
import Address from '../../molecules/address/address';
import FieldDocument from '../../molecules/field-document';

type StepProps = {
    [key: string]: any;
    nextStep: () => void;
    prevStep: () => void;
}

const StepSignUp02 = ({ nextStep, prevStep, ...rest }: StepProps) => {

    const { values, handleChange, handleBlur } = useFormikContext<InitialStateSignUp>()

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
                        name="firstName"
                        aria-label="firstName"
                        className="form-control"
                        placeholder="Nome"
                        required
                        disabledError
                    >

                        <Form.Control
                            type="text"
                            name="lastName"
                            aria-label="lastName"
                            placeholder="Sobrenome"
                            required
                            className='ms-1 w-50'

                        />

                    </FieldControl>

                    <FieldDocument
                        label='CPF/CNPJ'
                        name="document"
                        aria-label="document"
                        className="form-control"
                        placeholder="CPF/CNPJ"
                        required
                    />

                    <Address />

                    <div className="mt-4 d-flex justify-content-center">
                        <button className="btn btn-success w-40 m-1" type="button" onClick={prevStep}>Anterior</button>
                        <button className="btn btn-success w-40 m-1" type="button" onClick={nextStep}>Próximo</button>
                    </div>
                </Container>



                {/* <div className="mt-4">
                        <button className="btn btn-success w-100" type="submit">Criar Conta</button>
                    </div> */}


            </div>
        </div>
    )
}

export default StepSignUp02