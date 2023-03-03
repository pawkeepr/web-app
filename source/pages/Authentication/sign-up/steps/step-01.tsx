
import { useFormikContext } from 'formik';
import Link from 'next/link';
import { useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';

import FieldControl from '~/Components/molecules/field-control';
import { InitialStateSignUp } from '../types';

type StepProps = {
    [key: string]: any;
    nextStep: () => void;
    prevStep: () => void;
}

const StepSignUp01 = ({ nextStep, prevStep, ...rest }: StepProps) => {
    const [passwordShow, setPasswordShow] = useState(false);

    const validation = useFormikContext<InitialStateSignUp>()

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

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                    <input type="email" className="form-control" id="email" placeholder="Digite seu email" required />
                    <div className="invalid-feedback">
                        Escreva seu Email Corretamente
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usuário <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="username" placeholder="Digite o nome de usuário" required />
                    <div className="invalid-feedback">
                        Escreva seu usuário corretamente
                    </div>
                </div>


                <div className="mb-3">
                    <label className="form-label" htmlFor="password-input">Password</label>
                    <FieldControl name="password"
                        type={passwordShow ? "text" : "password"}
                        className="form-control pe-5 password-input border-end-0"
                        placeholder="Digite sua senha"
                        id="password-input"
                        value={validation.values.password}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                    >
                        <InputGroup.Text className="bg-transparent border-start-0">
                            <i onClick={onToggleVisiblePassword} className={passwordShow ? 'ri-eye-off-fill' : 'ri-eye-fill'}></i>
                        </InputGroup.Text>
                    </FieldControl>

                </div>

                <div className="mb-4">
                    <p className="mb-0 fs-12 text-muted fst-italic">Você se registrando aceita os termos de uso da plataforma <Link href="#" className="text-primary text-decoration-underline fst-normal fw-medium">Termos de Uso</Link></p>
                </div>

                <div id="password-contain" className="p-3 bg-light mb-2 rounded">
                    <h5 className="fs-13">Password must contain:</h5>
                    <p id="pass-length" className="invalid fs-12 mb-2">Mínimo <b>8 caracteres</b></p>
                    <p id="pass-lower" className="invalid fs-12 mb-2">Uma letra <b>minúscula</b> (a-z)</p>
                    <p id="pass-upper" className="invalid fs-12 mb-2">Uma letra <b>maiúscula</b> (A-Z)</p>
                    <p id="pass-number" className="invalid fs-12 mb-0">Um <b>número</b> (0-9)</p>
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