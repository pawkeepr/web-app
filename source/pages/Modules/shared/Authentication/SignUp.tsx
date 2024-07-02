'use client'

import { useEffect } from 'react'

//formik
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import validateEmail from '~/validations/email'
import validatePassword from '~/validations/password'

import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { BtnLink, BtnPrimary } from '~/Components/atoms/btn'
import FieldCheckbox from '~/Components/molecules/field-checkbox'
import FieldControl from '~/Components/molecules/field-control'
import FieldPassword from '~/Components/molecules/field-password'
import PasswordRules from '~/Components/molecules/password-rules'
import LOADING from '~/constants/loading'
import useModeProfile from '~/hooks/use-mode'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
    registerUser,
    resetRegisterFlag,
} from '~/store/slices/auth/register/actions'
import type { AccountSignUp } from '~/store/slices/auth/register/types'
import { CodeProfile, ModeProfile } from '~/types/profile'
import AuthLayout from '../../_layouts/auth/auth_layout'
import type { CoverSignInProps } from './SignIn'

const validationSchema = Yup.object({
    email: validateEmail,
    password: validatePassword,
    passwordConfirm: Yup.string()
        .trim()
        .when('password', ([password]) => {
            return Yup.string()
                .trim()
                .required('Repita a Senha')
                .test(
                    'passwords-match',
                    'As senhas não conferem',
                    (value) => password === value,
                )
        }),
    termsOfUse: Yup.boolean()
        .oneOf([true], 'Você deve aceitar os termos de uso')
        .required(),
    privacyPolicy: Yup.boolean()
        .oneOf([true], 'Você deve aceitar a política de privacidade')
        .required(),
    //person: validatePerson,
    //address: validateAddress,
})

const makeInitialValues = (mode: ModeProfile) =>
    ({
        email: '',
        password: '',
        passwordConfirm: '',
        termsOfUse: false,
        privacyPolicy: false,
        has_profile: 'no',
        type_profile: CodeProfile[mode],
    }) as AccountSignUp

const CoverSignUp = ({ bgImage }: CoverSignInProps) => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector((state) => state.Login.isLoading)
    const { mode } = useModeProfile()

    const onSubmit = (values: AccountSignUp) => {
        dispatch(registerUser(values))
    }

    useEffect(() => {
        return () => {
            dispatch(resetRegisterFlag())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const modeProfile = mode === ModeProfile.vet ? 'veterinary' : 'tutor'

    const initialValues = makeInitialValues(mode)

    return (
        <AuthLayout
            title="Criar conta"
            image={bgImage}
            alt="Imagem cartunizada de pessoas e um globo terrestre se comunicando"
        >
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {({ values, isValid, isSubmitting, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center w-full mt-2">
                            <p className="text-sm font-bold text-secondary-500">
                                Crie uma Conta
                            </p>
                            <p className="text-xs text-gray-400">
                                Aproveite todos os Benefícios Agora!
                            </p>
                            <p className="text-xs font-bold text-secondary-500">
                                Obrigatório (*)
                            </p>
                        </div>
                        <FieldControl
                            ctx={values}
                            label="Email"
                            initialFocus
                            name="email"
                            type="email"
                            className=""
                            aria-label="email"
                            placeholder="Digite seu email"
                            required
                            disabledError
                        />
                        <FieldPassword
                            ctx={values}
                            required
                            label="Senha"
                            name="password"
                            placeholder="Digite sua senha"
                            aria-label="password"
                            disabledError
                        />
                        <FieldPassword
                            ctx={values}
                            required
                            label="Repita a senha"
                            name="passwordConfirm"
                            placeholder="Repita a senha"
                            aria-label="password-confirm"
                            disabledError
                        />

                        <PasswordRules value={values.password} />
                        <div className="flex flex-col items-start justify-start">
                            <FieldCheckbox ctx={values} name="termsOfUse">
                                <p className="text-xs italic text-justify">
                                    {
                                        'Você se registrando aceita os termos de uso da plataforma: '
                                    }
                                    <Link
                                        href={`/${modeProfile}/terms-of-use`}
                                        className="no-underline text-primary fst-normal fw-medium"
                                    >
                                        Termos de Uso.{' '}
                                    </Link>
                                </p>
                            </FieldCheckbox>
                            <FieldCheckbox ctx={values} name="privacyPolicy">
                                <p className="text-xs italic text-justify">
                                    {
                                        'Você se registrando aceita a política de privacidade da plataforma: '
                                    }
                                    <Link
                                        href={`/${modeProfile}/privacy-policy`}
                                        className="no-underline text-primary fst-normal fw-medium"
                                    >
                                        Política de Privacidade
                                    </Link>
                                </p>
                            </FieldCheckbox>
                        </div>

                        <div className="flex items-center justify-center">
                            <BtnPrimary
                                label={
                                    isLoading === LOADING.PENDING
                                        ? 'Carregando...'
                                        : 'Criar conta'
                                }
                                type="submit"
                                className="w-full"
                                disabled={
                                    !isValid ||
                                    isSubmitting ||
                                    isLoading === LOADING.PENDING
                                }
                            />
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="mobile:hidden w-full flex flex-col justify-center items-center !h-fit">
                <p className="text-xs">Você já tem uma conta ?</p>
                <BtnLink
                    className="p-0 h-fit"
                    href={`/${modeProfile}/sign-in`}
                    message="Entrar"
                />
            </div>
            <BtnLink
                message="Voltar"
                className="absolute items-center justify-start hidden mobile:flex max-w-fit top-2 left-2"
                href={`/${modeProfile}/sign-in`}
            >
                <ArrowLeftCircleIcon />
            </BtnLink>
        </AuthLayout>
    )
}

export default CoverSignUp
