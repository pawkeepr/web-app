
import { useFormikContext } from 'formik';
import Link from 'next/link';
import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FieldControl from '~/Components/molecules/field-control';

import type { InitialStateSignUp } from '../../../SignUp';

type StepProps = {
    [key: string]: any;
    nextStep: () => void;
    prevStep: () => void;
}

const StepSignUp01 = ({ nextStep, prevStep, ...rest }: StepProps) => {
    const [passwordShow, setPasswordShow] = useState(false);

    const { values, handleChange, handleBlur, errors, touched } = useFormikContext<InitialStateSignUp>()

    const onToggleVisiblePassword = () => {
        setPasswordShow(state => !state)
    }

    return (
        <div className="p-lg-5 p-4">
            <div>
                <h5 className="text-primary">Criar Conta</h5>
                <p className="text-muted">Crie uma conta PawKeeprs gratuita agora e aproveite.</p>
            </div>

            <div className="mt-4">

                <Card className="d-flex flex-column">

                    <FieldControl
                        label="Email"
                        name="email"
                        type="email"
                        className="form-control"
                        aria-label="email"
                        placeholder="Digite seu email"
                        required
                    />

                    <FieldControl
                        label="Usuário"
                        name="username"
                        className="form-control"
                        type="text"
                        aria-label="username"
                        startChildren={<InputGroup.Text id="basic-addon1">@</InputGroup.Text>}
                        placeholder="Digite o nome de usuário"
                        required
                    />


                    <FieldControl
                        required
                        label='Senha'
                        name="password"
                        type={passwordShow ? "text" : "password"}
                        className="form-control border-end-0"
                        placeholder="Digite sua senha"
                        aria-label="password"
                        onBlur={handleBlur}
                    >
                        <InputGroup.Text className="bg-transparent border-start-0">
                            <i onClick={onToggleVisiblePassword} className={passwordShow ? 'ri-eye-fill' : 'ri-eye-off-fill'} ></i>
                        </InputGroup.Text>
                    </FieldControl>

                </Card>

                <div className="p-3 bg-light mb-2 rounded">
                    <h5 className="fs-13">Senha deve conter:</h5>
                    <p id="pass-length" className="invalid fs-12 mb-2">Mínimo <b>8 caracteres</b></p>
                    <p id="pass-lower" className="invalid fs-12 mb-2">Uma letra <b>minúscula</b> (a-z)</p>
                    <p id="pass-upper" className="invalid fs-12 mb-2">Uma letra <b>maiúscula</b> (A-Z)</p>
                    <p id="pass-number" className="invalid fs-12 mb-0">Um <b>número</b> (0-9)</p>
                </div>

                <div className="mb-4">
                    <p className="mb-0 fs-12 text-muted fst-italic">Você se registrando aceita os termos de uso da plataforma <Link href="#" className="text-primary text-decoration-underline fst-normal fw-medium">Termos de Uso</Link></p>
                </div>

                <div className="mt-4 d-flex justify-content-center">
                    <button className="btn btn-success w-40 m-1" type="button" onClick={nextStep}>Próximo</button>
                </div>

                {/* <div className="mt-4 text-center">
                    <div className="signin-other-title">
                        <h5 className="fs-13 mb-4 title text-muted">Criar conta com:</h5>
                    </div>

                    <div>
                        <button type="button" className="btn btn-primary btn-icon waves-effect waves-light me-1"><i className="ri-facebook-fill fs-16"></i></button>
                        <button type="button" className="btn btn-danger btn-icon waves-effect waves-light me-1"><i className="ri-google-fill fs-16"></i></button>
                        <button type="button" className="btn btn-dark btn-icon waves-effect waves-light me-1"><i className="ri-github-fill fs-16"></i></button>
                        <button type="button" className="btn btn-info btn-icon waves-effect waves-light"><i className="ri-twitter-fill fs-16"></i></button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default StepSignUp01