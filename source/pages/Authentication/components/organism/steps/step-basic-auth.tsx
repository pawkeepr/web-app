
import { useFormikContext } from 'formik';
import { useMemo, useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';

import BtnSuccess from '~/Components/atoms/btn/btn-success';
import FieldControl from '~/Components/molecules/field-control';
import { AccountSignUp } from '~/store/auth/register/types';


import PasswordRules from '../../molecules/password-rules';
import Container from '../../template/container';

import Link from 'next/link';
import { Form } from 'react-bootstrap';
import LOADING from '~/constants/loading';
import { useAppSelector } from '~/store/hooks';
import { StepProps } from './types';

const StepSignUpBasicAuth = ({ nextStep }: StepProps) => {

    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordConfirmShow, setPasswordConfirmShow] = useState(false);

    const {
        values,
        handleBlur,
        handleChange,
        isValid,
        handleSubmit
    } = useFormikContext<AccountSignUp>()

    const isLoading = useAppSelector(state => state.Account.loading)

    // const requiredValid = useMemo(() => {
    //     return (
    //         validatePassword.isValidSync(password) &&
    //         validateEmail.isValidSync(email) &&
    //         password === passwordConfirm
    //     )
    // }, [email, password, passwordConfirm])

    const onToggleVisiblePassword = () => {
        setPasswordShow(state => !state)
    }

    const onToggleVisiblePasswordConfirm = () => {
        setPasswordConfirmShow(state => !state)
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleSubmit()
        nextStep()
    }

    const loading = useMemo(() => isLoading === LOADING.PENDING || !isValid, [isLoading, isValid])

    return (
        <Container>

            <FieldControl
                label="Email"
                initialFocus
                name="email"
                type="email"
                className="form-control"
                aria-label="email"
                placeholder="Digite seu email"
                required
                disabledError
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
            <Form.Check
                type="checkbox"
                className="w-100"
                name="termsOfUse"
                id="termsOfUse"
                onChange={handleChange}
                checked={values.termsOfUse}
                label={
                    <p className="fs-12 fst-italic">
                        {"Você se registrando aceita os termos de uso da plataforma: "}
                        <Link href="#" className="text-primary no-underline fst-normal fw-medium">Termos de Uso</Link>
                    </p>
                }
            />

            <Form.Check
                type="checkbox"
                className="w-100"
                name="policyPrivacy"
                id="policyPrivacy"
                onChange={handleChange}
                checked={values.policyPrivacy}
                label={
                    <p className="fs-12 fst-italic">
                        {"Você se registrando aceita a política de privacidade da plataforma: "}
                        <Link href="#" className="text-primary no-underline fst-normal fw-medium">Política de Privacidade</Link>
                    </p>
                }
            />

            <div className="mt-4 flex justify-center w-full">
                <BtnSuccess
                    label="Finalizar cadastro"
                    type="submit"
                    onClick={handleClick}
                    disabled={loading}
                    className="align-self-center !w-60 mobile:!w-full"
                />
            </div>

        </Container>
    )
}

export default StepSignUpBasicAuth