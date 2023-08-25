
import { useFormikContext } from 'formik';
import { useMemo } from 'react';


import { BtnPrimary } from '~/Components/atoms/btn';
import FieldControl from '~/Components/molecules/field-control';
import { AccountSignUp } from '~/store/auth/register/types';

import PasswordRules from '../../molecules/password-rules';

import Link from 'next/link';
import FieldCheckbox from '~/Components/molecules/field-checkbox';
import FieldPassword from '~/Components/molecules/field-password';
import LOADING from '~/constants/loading';
import { useAppSelector } from '~/store/hooks';
import { StepProps } from './types';

const StepSignUpBasicAuth = ({ nextStep }: StepProps) => {

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

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleSubmit()
        nextStep()
    }

    const loading = useMemo(() => isLoading === LOADING.PENDING || !isValid, [isLoading, isValid])

    return (
        <div>
            <div className="flex flex-col w-full items-center mt-2">
                <p className="text-sm font-semibold text-secondary-500">
                    Crie uma Conta</p>
                <p className="text-gray-400 text-xs">
                    Aproveite todos os Benefícios Agora!
                </p>
            </div>
            <FieldControl
                label="Email"
                initialFocus
                name="email"
                type="email"
                className=" "
                aria-label="email"
                placeholder="Digite seu email"
                required
                disabledError
            />
            <div className="grid grid-cols-2 mobile:grid-cols-1 gap-2">
                <FieldPassword
                    required
                    label='Senha'
                    name="password"
                    placeholder="Digite sua senha"
                    aria-label="password"
                    onBlur={handleBlur}
                    disabledError
                />

                <FieldPassword
                    required
                    label='Repita a senha'
                    name="passwordConfirm"
                    placeholder="Repita a senha"
                    aria-label="password-confirm"
                    onBlur={handleBlur}
                    disabledError
                />
            </div>

            <PasswordRules value={values.password} />
            <FieldCheckbox
                name="termsOfUse"
            >
                <p className="italic text-xs text-justify">
                    {"Você se registrando aceita os termos de uso da plataforma: "}
                    <Link href="#" className="text-primary no-underline fst-normal fw-medium">Termos de Uso.{" "}</Link>
                    {"Você se registrando aceita a política de privacidade da plataforma: "}
                    <Link href="#" className="text-primary no-underline fst-normal fw-medium">Política de Privacidade</Link>
                </p>
            </FieldCheckbox>

            <div className='flex  items-center justify-center'>
                <BtnPrimary
                    label="Finalizar cadastro"
                    type="submit"
                    className="w-full"
                    onClick={handleClick}
                    disabled={loading}
                />
            </div>


        </div>
    )
}

export default StepSignUpBasicAuth