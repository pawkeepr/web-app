
import { useFormikContext } from 'formik';
import { useMemo, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FieldControl from '~/Components/molecules/field-control';
import validateEmail from '~/validations/email';
import validatePassword from '~/validations/password';
import PasswordRules from '../../molecules/password-rules';

import { AccountSignUp } from '~/store/auth/register/types';
import { StepProps } from './types';


const StepSignUpBasicAuth = ({ nextStep, prevStep, ...rest }: StepProps) => {
    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordConfirmShow, setPasswordConfirmShow] = useState(false);

    const { values, handleBlur } = useFormikContext<AccountSignUp>()
    const { email, password, passwordConfirm } = values;

    const requiredFieldsFilled = useMemo(() => {
        return (
            validatePassword.isValidSync(password) &&
            validateEmail.isValidSync(email) &&
            password === passwordConfirm
        );
    }, [email, password, passwordConfirm])

    const onToggleVisiblePassword = () => {
        setPasswordShow(state => !state)
    }

    const onToggleVisiblePasswordConfirm = () => {
        setPasswordConfirmShow(state => !state)
    }

    return (
        <Container className="p-lg-5 p-4 h-screen">
            <div>
                <h5 className="text-primary">Criar Conta</h5>
                <p className="text-muted">Crie uma conta PawKeeprs gratuita agora e aproveite.</p>
            </div>

            <div className="mt-4">

                <Card className="d-flex flex-column shadow-none">

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
                        required
                        label='Senha'
                        name="password"
                        type={passwordShow ? "text" : "password"}
                        className="form-control border-end-0"
                        placeholder="Digite sua senha"
                        aria-label="password"
                        onBlur={handleBlur}
                        disabledError
                    >
                        <InputGroup.Text className="bg-transparent border-start-0">
                            <i onClick={onToggleVisiblePassword} className={passwordShow ? 'ri-eye-fill' : 'ri-eye-off-fill'} ></i>
                        </InputGroup.Text>
                    </FieldControl>

                    <FieldControl
                        required
                        label='Repita a senha'
                        name="passwordConfirm"
                        type={passwordConfirmShow ? "text" : "password"}
                        className="form-control border-end-0"
                        placeholder="Repita a senha"
                        aria-label="password-confirm"
                        onBlur={handleBlur}
                        disabledError
                    >
                        <InputGroup.Text className="bg-transparent border-start-0">
                            <i onClick={onToggleVisiblePasswordConfirm} className={passwordConfirmShow ? 'ri-eye-fill' : 'ri-eye-off-fill'} ></i>
                        </InputGroup.Text>
                    </FieldControl>
                </Card>

                <PasswordRules value={values.password} />


                <div className="mt-4 d-flex justify-content-center">
                    <button className="
                    btn 
                    btn-success 
                    bg-green-600 
                    w-40
                    m-1 
                    next
                    "
                        type="button"
                        onClick={nextStep}
                        disabled={!requiredFieldsFilled}
                    >Próximo</button>
                </div>

            </div>
        </Container>
    )
}

export default StepSignUpBasicAuth