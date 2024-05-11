import { useFormikContext } from 'formik'

import { useMemo } from 'react'

import { BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import validatePerson from '~/validations/person'

import { FaWhatsapp } from 'react-icons/fa'
import ControlSwitch from '~/Components/atoms/switch-v2/switch'
import FieldCrmv from '~/Components/molecules/field-crmv'
import FieldDocument from '~/Components/molecules/field-document'
import FieldPhone from '~/Components/molecules/field-phone'
import useNextStep from '~/hooks/use-next-step'
import type { ActivateAccount } from '~/validations/activate'
import type { StepProps } from './types'

const StepSignUpPerson = ({ nextStep }: StepProps) => {
    const { values, setFieldValue } = useFormikContext<ActivateAccount>()

    const requiredValid = useMemo((): boolean => {
        return validatePerson.isValidSync(values)
    }, [values])

    useNextStep(nextStep, requiredValid)

    const copyPhoneToWhatsApp = (checked: boolean) => {
        if (!checked) {
            setFieldValue('contact.whatsapp', '')
            return
        }

        setFieldValue('contact.whatsapp', values.contact.phone)
    }

    return (
        <div className="flex flex-row flex-wrap w-full">
            <FieldControl
                ctx={values}
                initialFocus
                label="Nome"
                name="firstName"
                divClassName="flex-grow w-1/5 "
                aria-label="firstName"
                placeholder="Nome"
                required
                disabledError
            />

            <FieldControl
                ctx={values}
                label="Sobrenome"
                divClassName="flex-grow w-1/2 "
                required
                separator={''}
                name="lastName"
                aria-label="lastName"
                placeholder="Sobrenome"
                disabledError
            />
            <div className="w-1/2">
                <FieldDocument
                    ctx={values}
                    divClassName="flex-grow"
                    label="CPF/CNPJ"
                    name="cpf_cnpj"
                    aria-label="cpf_cnpj"
                    placeholder="CPF/CNPJ"
                    required
                />
            </div>
            <div className="w-1/2">
                <FieldCrmv
                    ctx={values}
                    label="CRMV"
                    name="crmv"
                    placeholder="Digite o seu CRMV"
                    required
                />
            </div>
            <div className="flex flex-row flex-grow w-full">
                <div className="w-1/2">
                    <FieldPhone
                        label="Telefone/Celular"
                        name="contact.phone"
                        placeholder="Digite o seu Número de Telefone"
                        required
                    />
                </div>

                <div className="w-1/2">
                    <FieldPhone
                        label="WhatsApp Comercial"
                        name="contact.whatsapp"
                        placeholder="Digite o seu Número do WhatsApp"
                        required
                    />
                </div>
            </div>
            <div className="flex items-center justify-center flex-grow w-full">
                <ControlSwitch onChange={copyPhoneToWhatsApp}>
                    <p className="flex flex-row items-center justify-center gap-1 text-xs font-semibold">
                        Clique aqui para duplicar o telefone no campo ao lado:
                        <FaWhatsapp className="text-xl text-green-600" />
                    </p>
                </ControlSwitch>
            </div>

            <div className="flex items-center justify-end w-full mt-1">
                <div className="flex-1" />
                <BtnPrimary
                    className="flex-1"
                    onClick={nextStep}
                    disabled={!requiredValid}
                    label="Próximo"
                />
            </div>
        </div>
    )
}

export default StepSignUpPerson
