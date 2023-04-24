
import { useFormikContext } from 'formik';
import { useMemo, useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';

import BtnSuccess from '~/Components/atoms/btn/btn-success';
import FieldControl from '~/Components/molecules/field-control';
import { AccountSignUp } from '~/store/auth/register/types';
import validateEmail from '~/validations/email';
import validatePassword from '~/validations/password';


import PasswordRules from '../../molecules/password-rules';
import Container from '../../template/container';

import useNextStep from '~/hooks/use-next-step';
import { StepProps } from './types';

const StepSignUpBasicAuth = ({ nextStep, ...rest }: StepProps) => {

    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordConfirmShow, setPasswordConfirmShow] = useState(false);

    const { values, handleBlur } = useFormikContext<AccountSignUp>()
    const { email, password, passwordConfirm } = values;

    const requiredValid = useMemo(() => {
        return (
            validatePassword.isValidSync(password) &&
            validateEmail.isValidSync(email) &&
            password === passwordConfirm
        )
    }, [email, password, passwordConfirm])

    useNextStep(nextStep, requiredValid)

    const onToggleVisiblePassword = () => {
        setPasswordShow(state => !state)
    }

    const onToggleVisiblePasswordConfirm = () => {
        setPasswordConfirmShow(state => !state)
    }

    return (
        <Container>

            <FieldControl
                divClassName='my-1'
                label="Email"
                initialFocus
                name="email"
                type="email"
                className="form-control"
                aria-label="email"
                placeholder="Digite seu email"
                required
            />

            <FieldControl
                divClassName='my-1'
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
                divClassName='my-1'
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
                <BtnSuccess label="Próximo" className="m-1" onClick={nextStep} disabled={!requiredValid} />
            </div>

        </Container>
    )
}

export default StepSignUpBasicAuth