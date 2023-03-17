
import { useFormikContext } from 'formik';
import { useMemo, useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FieldControl from '~/Components/molecules/field-control';
import validateEmail from '~/validations/email';
import validatePassword from '~/validations/password';
import PasswordRules from '../../molecules/password-rules';

import { AccountSignUp } from '~/store/auth/register/types';
import BtnSuccess from '../../../../../Components/atoms/btn/btn-success';
import Container from '../../template/container';
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
        <Container>

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


            <PasswordRules value={values.password} />


            <div className="mt-4 d-flex justify-content-center">
                <BtnSuccess label="Próximo" className="m-1" onClick={nextStep} disabled={!requiredFieldsFilled} />
            </div>

        </Container>
    )
}

export default StepSignUpBasicAuth