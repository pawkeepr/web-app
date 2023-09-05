/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Formik } from "formik";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { BtnCancel, BtnLink } from "~/Components/atoms/btn";
import AuthLayout from "../_layouts/auth/auth_layout";

import * as Yup from "yup";

import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import ConfirmAccountForm from "~/Components/forms/confirm-account-form";
import {
    activateAccount,
    resendConfirmationCode,
    resetProfileFlag
} from '~/store/auth/activate-account/actions';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

const validationSchema = Yup.object({
    email: Yup.string().email().required('Campo obrigatório'),
    digit0: Yup.string().required('Campo obrigatório').min(1, 'Campo obrigatório').max(1, 'Campo obrigatório'),
    digit1: Yup.string().required('Campo obrigatório').min(1, 'Campo obrigatório').max(1, 'Campo obrigatório'),
    digit2: Yup.string().required('Campo obrigatório').min(1, 'Campo obrigatório').max(1, 'Campo obrigatório'),
    digit3: Yup.string().required('Campo obrigatório').min(1, 'Campo obrigatório').max(1, 'Campo obrigatório'),
    digit4: Yup.string().required('Campo obrigatório').min(1, 'Campo obrigatório').max(1, 'Campo obrigatório'),
    digit5: Yup.string().required('Campo obrigatório').min(1, 'Campo obrigatório').max(1, 'Campo obrigatório'),
});

export type SchemaConfirmAccount = Yup.InferType<typeof validationSchema>


const ConfirmAccount = () => {
    const email = useAppSelector(state => state.ActivateAccount.email)

    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        if (!email) {
            router.push('/sign-in')
        }
    }, [email])

    useEffect(() => {
        return () => {
            dispatch(resetProfileFlag())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleResend = () => {
        dispatch(resendConfirmationCode({ username: email }))
    }

    const handleSubmit = (values: SchemaConfirmAccount) => {
        const code = `${values.digit0}${values.digit1}${values.digit2}${values.digit3}${values.digit4}${values.digit5}`
        dispatch(activateAccount({ username: values.email, code }))
    }

    return (
        <AuthLayout title="Criar conta" image='/bg-sign-up.webp'
            alt="Imagem cartunizada de pessoas e um globo terrestre se comunicando">

            <Formik
                initialValues={{
                    email: email,
                    digit0: '',
                    digit1: '',
                    digit2: '',
                    digit3: '',
                    digit4: '',
                    digit5: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <ConfirmAccountForm />
            </Formik>
            <div className="mt-4 text-center w-full flex items-center justify-center flex-col">
                <p className="mb-0 text-xs text-gray-500">Você não recebeu o código?</p>
                <BtnCancel label='Reenviar Código' onClick={() => handleResend()} />
            </div>
            <div className="mobile:hidden w-full flex flex-col justify-center items-center !h-fit">
                <p className="text-xs text-gray-500">
                    Você já tem uma conta ?
                </p>
                <BtnLink
                    className="p-0 h-fit"
                    href="/sign-in"
                    message="Entrar"
                />


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

export default ConfirmAccount