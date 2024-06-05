import { useFormikContext } from 'formik'

import { useMemo } from 'react'

import { BtnNeutral, BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import validatePerson from '~/validations/tutor'

import FieldPhone from '~/Components/molecules/field-phone'
import type { ActivateAccount } from '../../activate'
import type { StepProps } from './types'

const StepSignUpPerson = ({ nextStep, prevStep }: StepProps) => {
    const { values } = useFormikContext<ActivateAccount>()

    const requiredValid = useMemo((): boolean => {
        const isValid = validatePerson.isValidSync(values)

        return isValid
    }, [values])

    return (
        <div className="container grid grid-cols-2 gap-1 mobile:grid-cols-1">
            <div className="grid grid-cols-2 col-span-2 gap-1 mobile:col-span-2">
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

            <FieldPhone
                ctx={values}
                divClassName="col-span-1 mobile:col-span-full"
                label="WhatsApp"
                name="contact.whatsapp"
                placeholder="Digite o seu Número do WhatsApp"
                required
            />

            <div className="flex items-center justify-center w-full gap-2 mt-1 col-span-full">
                <BtnNeutral
                    outline
                    className="border-none"
                    onClick={prevStep}
                    label="Voltar"
                />
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
