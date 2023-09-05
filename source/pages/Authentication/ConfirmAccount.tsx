/* eslint-disable react-hooks/exhaustive-deps */
"use client";


//formik
import { Form, Formik } from "formik";


import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { BtnCancel, BtnLink, BtnPrimary } from "~/Components/atoms/btn";
import InputCode from '~/Components/atoms/input-code/input-code';
import AuthLayout from "../_layouts/auth/auth_layout";

import * as Yup from "yup";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from 'react';
import LOADING from "~/constants/loading";
import {
    activateAccount,
    resendConfirmationCode,
    resetProfileFlag
} from '~/store/auth/activate-account/actions';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export type ActivateAccount = {
    email: string;
    code: string;
}


const validationSchema = Yup.object({
    email: Yup.string().email().required('Campo obrigatório'),
});


type ConfirmAccountProps = {
    email: string;
}

const ConfirmAccount = ({ email }: ConfirmAccountProps) => {
    const [firstLoad, setFirstLoad] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (!email && !firstLoad) {
            router.push('/sign-in')
        }
        setFirstLoad(false)
    }, [email, firstLoad])

    const [inputValues, setInputValues] = useState<string[]>(Array(6).fill('')); // Inicializa um array de 6 strings vazias

    const isLoading = useAppSelector((state) => state.ActivateAccount.isLoading)
    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            dispatch(resetProfileFlag())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getInputElement = (index: number) => {
        return document.getElementById('digit' + index + '-input');
    }

    const handleChange = (index: number) => (event: { target: { value: string; }; }) => {
        setInputValues((state) => {
            state[index] = event.target.value;
            return [...state];
        });
    }

    const moveToNext = (index: number) => () => {
        if (getInputElement(index)?.value.length === 1) {
            if (index !== 6) {
                getInputElement(index + 1)?.focus();
            } else {
                getInputElement(index)?.blur();
                // Submit code
            }
        }
    }

    const handleResend = () => {
        dispatch(resendConfirmationCode({ username: email }))
    }

    const handleSubmit = (values: ActivateAccount) => {
        const code = inputValues.join('')
        console.log(code)

        dispatch(activateAccount({ username: values.email, code }))
        // router.push("/sign-in");
    }

    const isValid = useMemo(() => inputValues.length === 6 && inputValues.every((item) => item !== ''), [inputValues])
    const loading = useMemo(() => isLoading === LOADING.PENDING, [isLoading])

    return (
        <AuthLayout title="Criar conta" image='/bg-sign-up.webp'
            alt="Imagem cartunizada de pessoas e um globo terrestre se comunicando">

            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    email,
                    code: ''
                }}
                onSubmit={handleSubmit}
            >
                {
                    ({ values, isSubmitting, handleSubmit, isValid: isValidFormik }) => (

                        <Form onSubmit={handleSubmit}>
                            <div className='flex flex-col items-center justify-center'>
                                <div className="text-center mb-2 gap-2">
                                    <h5 className="text-secondary-500 font-semibold p-2">Olá, Seja Bem-Vindo(a)!</h5>
                                    <p className="text-xs text-gray-500" >
                                        Para seu primeiro acesso,
                                        você deve ativar sua conta e
                                        completar seu cadastro na plataforma.
                                        Preencha o código de verificação
                                        enviado para o seu email:
                                        <br />
                                        <span className="mx-2 font-semibold">{email || 'email@teste.com'}</span>

                                    </p>
                                </div>
                            </div>
                            <form>
                                <div className="grid grid-cols-6 w-full gap-2">
                                    {
                                        inputValues.map((item, index) => (
                                            <div className="col-span-1" key={index} >
                                                <InputCode
                                                    required
                                                    value={item}
                                                    onChange={handleChange(index)}
                                                    moveToNext={moveToNext(index)}
                                                    id={'digit' + index + '-input'}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </form>
                            <div className="mt-3">
                                <BtnPrimary
                                    label='Confirmar'
                                    className="!w-full"
                                    type="submit"
                                    disabled={!isValid || isSubmitting || loading || !isValidFormik}
                                />
                            </div>
                            <div className="mt-4 text-center w-full flex items-center justify-center flex-col">
                                <p className="mb-0 text-xs text-gray-500">Você não recebeu o código?</p>
                                <BtnCancel label='Reenviar Código' onClick={() => handleResend()} />
                            </div>
                        </Form>
                    )
                }

            </Formik>
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