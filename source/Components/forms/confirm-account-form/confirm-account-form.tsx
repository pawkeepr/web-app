/* eslint-disable react-hooks/exhaustive-deps */
import { useFormikContext } from 'formik'

import { Form } from 'formik'

import { BtnPrimary } from '~/Components/atoms/btn'

import FieldCode from '~/Components/molecules/field-code'
import LOADING from '~/constants/loading'
import type { SchemaConfirmAccount } from '~/pages/Modules/shared/Authentication/ConfirmAccount'

type ConfirmAccountFormProps = {
    isLoading?: LOADING
}

const ConfirmAccountForm = ({
    isLoading = LOADING.IDLE,
}: ConfirmAccountFormProps) => {
    const {
        values: { email },
        handleSubmit,
        isValid,
    } = useFormikContext<SchemaConfirmAccount>()

    return (
        <Form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center">
                <div className="gap-2 mb-2 text-center">
                    <h5 className="p-2 font-semibold text-secondary-500">
                        Olá, Seja Bem-Vindo(a)!
                    </h5>
                    <p className="text-xs text-gray-500">
                        Para seu primeiro acesso, você deve ativar sua conta e
                        completar seu cadastro na plataforma. Preencha o código de
                        verificação enviado para o seu email:
                        <br />
                        <span className="mx-2 font-semibold">{email}</span>
                    </p>
                </div>
            </div>
            <form>
                <div className="grid w-full grid-cols-6 gap-2">
                    {Array(6)
                        .fill('')
                        .map((_, index) => (
                            <div className="col-span-1" key={index}>
                                <FieldCode
                                    required
                                    position={index}
                                    name={`digit${index}`}
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
                    isLoading={isLoading === LOADING.PENDING}
                    disabled={!isValid}
                />
            </div>
        </Form>
    )
}

export default ConfirmAccountForm
