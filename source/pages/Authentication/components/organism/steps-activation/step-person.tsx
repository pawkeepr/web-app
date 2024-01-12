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
        const isValid = validatePerson.isValidSync(values)

        return isValid
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
            <div className="col-span-1 mobile:col-span-2">
                <FieldDocument
                    ctx={values}
                    divClassName="col-span-2 mobile:col-span-2"
                    label="CPF/CNPJ"
                    name="cpf_cnpj"
                    aria-label="cpf_cnpj"
                    placeholder="CPF/CNPJ"
                    required
                />
            </div>
            <div className="col-span-1 mobile:col-span-2">
                <FieldCrmv
                    ctx={values}
                    label="CRMV"
                    name="crmv"
                    placeholder="Digite o seu CRMV"
                    required
                />
            </div>
            <div className="grid grid-cols-2 col-span-full gap-1">
                <FieldPhone
                    divClassName="col-span-1 mobile:col-span-full"
                    label="Telefone/Celular"
                    name="contact.phone"
                    placeholder="Digite o seu Número de Telefone"
                    required
                />
                <div className="w-full hidden mobile:flex col-span-full justify-center items-center">
                    <ControlSwitch onChange={copyPhoneToWhatsApp}>
                        <p className="text-xs font-semibold flex flex-row justify-center items-center gap-1">
                            Clique aqui para duplicar o telefone no campo ao lado:
                            <FaWhatsapp className="text-green-600 text-xl cursor-pointer" />
                        </p>
                    </ControlSwitch>
                </div>
                <FieldPhone
                    divClassName="col-span-1 mobile:col-span-full"
                    t
                    label="WhatsApp"
                    name="contact.whatsapp"
                    placeholder="Digite o seu Número do WhatsApp"
                    required
                />
                <div className="w-full flex mobile:hidden col-span-full justify-center items-center">
                    <ControlSwitch onChange={copyPhoneToWhatsApp}>
                        <p className="text-xs font-semibold flex flex-row justify-center items-center gap-1">
                            Clique aqui para duplicar o telefone no campo ao lado:
                            <FaWhatsapp className="text-green-600 text-xl" />
                        </p>
                    </ControlSwitch>
                </div>
            </div>

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
