/* eslint-disable react-hooks/exhaustive-deps */
import { useFormikContext } from 'formik'
import { useMemo } from 'react'

import { Form } from 'formik'

import { BtnPrimary } from '~/Components/atoms/btn'

import FieldCode from '~/Components/molecules/field-code'
import LOADING from '~/constants/loading'
import type { SchemaConfirmAccount } from '~/pages/Authentication/ConfirmAccount'
import { useAppSelector } from '~/store/hooks'

const ConfirmAccountForm = () => {
    const {
        values: { email },
        handleSubmit,
        isSubmitting,
        isValid,
    } = useFormikContext<SchemaConfirmAccount>()
    const isLoading = useAppSelector((state) => state.ActivateAccount.isLoading)

    const getInputElement = (index: number) => {
        return document.getElementById(`digit${index}-input`)
    }

    const moveToNext = (index: number) => () => {
        if (getInputElement(index)?.value.length === 1) {
            if (index !== 6) {
                getInputElement(index + 1)?.focus()
            } else {
                getInputElement(index)?.blur()
                // Submit code
            }
        }
    }

    const loading = useMemo(() => isLoading === LOADING.PENDING, [isLoading])

    return (
        <Form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center">
                <div className="text-center mb-2 gap-2">
                    <h5 className="text-secondary-500 font-semibold p-2">
                        Olá, Seja Bem-Vindo(a)!
                    </h5>
                    <p className="text-xs text-gray-500">
                        Para seu primeiro acesso, você deve ativar sua conta e
                        completar seu cadastro na plataforma. Preencha o código de
                        verificação enviado para o seu email:
                        <br />
                        <span className="mx-2 font-semibold">
                            {email || 'email@teste.com'}
                        </span>
                    </p>
                </div>
            </div>
            <form>
                <div className="grid grid-cols-6 w-full gap-2">
                    {Array(6)
                        .fill('')
                        .map((_, index) => (
                            <div className="col-span-1" key={index}>
                                <FieldCode
                                    required
                                    name={`digit${index}`}
                                    moveToNext={moveToNext(index)}
                                    id={`digit${index}-input`}
                                    className="text-dark-600"
                                />
                            </div>
                        ))}
                </div>
            </form>
            <div className="mt-3">
                <BtnPrimary
                    label="Enviar Código"
                    className="!w-full"
                    type="submit"
                    disabled={isSubmitting || loading || !isValid}
                />
            </div>
        </Form>
    )
}

export default ConfirmAccountForm
