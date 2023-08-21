import { BtnLabel, BtnPrimary } from '~/Components/atoms/btn';
import InputCode from '~/Components/atoms/input-code/input-code';
import { StepProps } from './types';

import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import LogoSimple from '~/Components/atoms/logo-simple';
import LogoSimpleMobile from '~/Components/atoms/logo-simple-mobile';
import LOADING from '~/constants/loading';
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

const StepActivation = ({ nextStep, prevStep, ...rest }: StepProps) => {
    const [inputValues, setInputValues] = useState<string[]>(Array(6).fill('')); // Inicializa um array de 6 strings vazias
    const { values } = useFormikContext<ActivateAccount>();

    const isLoading = useAppSelector((state) => state.ActivateAccount.isLoading)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isLoading === LOADING.SUCCESS) {
            nextStep()
        }
        return () => {
            dispatch(resetProfileFlag())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])


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
        dispatch(resendConfirmationCode({ username: values.email }))
    }

    const handleSubmit = () => {
        const code = inputValues.join('')
        dispatch(activateAccount({ username: values.email, code }))
    }

    const isValid = inputValues.length === 6 && inputValues.every((item) => item !== '');

    // useNextStep(nextStep, true, 1000)

    return (

        <div className="p-2 mt-4">
            <div className='flex flex-col items-center justify-center'>
                <LogoSimple className='hidden mobile:block' />
                <LogoSimpleMobile className='mobile:hidden' />
                <div className="text-center text-muted mb-2 gap-2">
                    <h5 className="text-primary p-2">Olá, Seja Bem-Vindo(a)!</h5>
                    <p >
                        Para seu primeiro acesso,
                        você deve ativar sua conta e
                        completar seu cadastro na plataforma.
                        Preencha o código de verificação
                        enviado para o seu email:
                        <br />
                        <span className="mx-2 fw-bold">{values.email}</span>
                    </p>
                </div>
            </div>
            <form>
                <div className="grid grid-cols-6 w-full gap-2">
                    {
                        inputValues.map((item, index) => (
                            <div className="col-span-1" key={index} >
                                <InputCode
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
                    className="w-full"
                    onClick={() => handleSubmit()}
                    disabled={!isValid}
                />
            </div>
            <div className="mt-4 text-center w-full flex items-center justify-center flex-col">
                <p className="mb-0">Você não recebeu o código?</p>
                <BtnLabel label='Reenviar' onClick={() => handleResend()} />
            </div>
        </div>

    )
}

export default StepActivation