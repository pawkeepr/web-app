import { useFormikContext } from 'formik'

import { useMemo } from 'react'

import { BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import validatePerson from '~/validations/tutor'

import FieldDocument from '~/Components/molecules/field-document'
import FieldPhone from '~/Components/molecules/field-phone'
import useNextStep from '~/hooks/use-next-step'
import type { ActivateAccount } from '../../activate'
import type { StepProps } from './types'

const StepSignUpPerson = ({ nextStep }: StepProps) => {
    const { values } = useFormikContext<ActivateAccount>()

    const requiredValid = useMemo((): boolean => {
        const isValid = validatePerson.isValidSync(values)

        return isValid
    }, [values])

    useNextStep(nextStep, requiredValid)

    return (
        <div className="container grid grid-cols-2 gap-1 mobile:grid-cols-1">
            <div className="col-span-2 mobile:col-span-2 grid grid-cols-2 gap-1">
                <FieldControl
                    ctx={values}
                    initialFocus
                    label="Nome"
                    name="firstName"
                    aria-label="firstName"
                    placeholder="Nome"
                    required
                    disabledError
                />

                <FieldControl
                    ctx={values}
                    label="Sobrenome"
                    required
                    separator={''}
                    name="lastName"
                    aria-label="lastName"
                    placeholder="Sobrenome"
                    disabledError
                />
            </div>
            <FieldDocument
                ctx={values}
                divClassName="col-span-1 mobile:col-span-full"
                label="CPF/CNPJ"
                name="cpf_cnpj"
                aria-label="cpf_cnpj"
                placeholder="CPF/CNPJ"
                required
            />
            <FieldPhone
                divClassName="col-span-1 mobile:col-span-full"
                label="WhatsApp"
                name="contact.whatsapp"
                placeholder="Digite o seu Número do WhatsApp"
                required
            />

            <div className="flex items-center justify-center mt-1 col-span-full">
                <BtnPrimary
                    onClick={nextStep}
                    disabled={!requiredValid}
                    label="Próximo"
                />
            </div>
        </div>
    )
}

export default StepSignUpPerson
