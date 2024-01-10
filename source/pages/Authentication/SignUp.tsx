'use client'

import { useEffect } from 'react'

//formik
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import validateEmail from '~/validations/email'
import validatePassword from '~/validations/password'

import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BtnLink, BtnPrimary } from '~/Components/atoms/btn'
import FieldCheckbox from '~/Components/molecules/field-checkbox'
import FieldControl from '~/Components/molecules/field-control'
import FieldPassword from '~/Components/molecules/field-password'
import PasswordRules from '~/Components/molecules/password-rules'
import LOADING from '~/constants/loading'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
    registerUser,
    resetRegisterFlag,
} from '~/store/slices/auth/register/actions'
import { AccountSignUp } from '~/store/slices/auth/register/types'
import AuthLayout from '../_layouts/auth/auth_layout'

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

const initialValues: AccountSignUp = {
    email: '',
    password: '',
    passwordConfirm: '',
    termsOfUse: false,
    policyPrivacy: false,
}

const CoverSignUp = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const isLoading = useAppSelector((state) => state.Login.isLoading)
    const onSubmit = async (values: AccountSignUp) => {
        dispatch(registerUser(values))
        router.push('/confirm-account')
    }

    useEffect(() => {
        return () => {
            dispatch(resetRegisterFlag())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthLayout
            title="Criar conta"
            image="/bg-sign-up.webp"
            alt="Imagem cartunizada de pessoas e um globo terrestre se comunicando"
        >
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {({ values, isValid, isSubmitting, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="flex flex-col w-full items-center mt-2">
                            <p className="text-sm font-bold text-secondary-500">
                                Crie uma Conta
                            </p>
                            <p className="text-gray-400 text-xs">
                                Aproveite todos os Benefícios Agora!
                            </p>
                            <p className="text-xs font-bold text-secondary-500">
                                Obrigatório (*)
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
                                label="Senha"
                                name="password"
                                placeholder="Digite sua senha"
                                aria-label="password"
                                disabledError
                            />

                            <FieldPassword
                                required
                                label="Repita a senha"
                                name="passwordConfirm"
                                placeholder="Repita a senha"
                                aria-label="password-confirm"
                                disabledError
                            />
                        </div>

                        <PasswordRules value={values.password} />
                        <div className="flex flex-col justify-start items-start">
                            <FieldCheckbox name="termsOfUse">
                                <p className="italic text-xs text-justify">
                                    {
                                        'Você se registrando aceita os termos de uso da plataforma: '
                                    }
                                    <Link
                                        href="#"
                                        className="text-primary no-underline fst-normal fw-medium"
                                    >
                                        Termos de Uso.{' '}
                                    </Link>
                                </p>
                            </FieldCheckbox>
                            <FieldCheckbox name="privacyPolicy">
                                <p className="italic text-xs text-justify">
                                    {
                                        'Você se registrando aceita a política de privacidade da plataforma: '
                                    }
                                    <Link
                                        href="#"
                                        className="text-primary no-underline fst-normal fw-medium"
                                    >
                                        Política de Privacidade
                                    </Link>
                                </p>
                            </FieldCheckbox>
                        </div>

                        <div className="flex  items-center justify-center">
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
                <BtnLink className="p-0 h-fit" href="/sign-in" message="Entrar" />
            </div>
            <BtnLink
                message="Voltar"
                className="hidden mobile:flex max-w-fit absolute top-2 left-2  items-center justify-start"
                href="/sign-in"
            >
                <ArrowLeftCircleIcon />
            </BtnLink>
        </AuthLayout>
    )
}

export default CoverSignUp
