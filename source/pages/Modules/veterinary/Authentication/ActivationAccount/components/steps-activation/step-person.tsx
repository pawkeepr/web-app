import { useFormikContext } from 'formik'

import { useMemo } from 'react'

import { BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import validatePerson, {
    validateCPF_CNPJ,
    validateCRMV,
    validateFirstName,
    validateLastName,
    validatePhone,
    validateWhatsApp,
} from '~/validations/person'

import { FaWhatsapp } from 'react-icons/fa'
import SwitchControl from '~/Components/atoms/switch-control/switch'
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
        <section className="flex flex-row flex-wrap w-full">
            <FieldControl
                ctx={values}
                initialFocus
                label="Nome"
                name="firstName"
                divClassName="flex-grow w-1/5 "
                aria-label="firstName"
                placeholder="Nome"
                validateSync={(value) => validateFirstName.isValidSync(value)}
                required
                disabledError
            />

            <FieldControl
                ctx={values}
                label="Sobrenome"
                divClassName="flex-grow w-1/2 "
                required
                separator={''}
                validateSync={(value) => validateLastName.isValidSync(value)}
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
                    validateSync={(value) => validateCPF_CNPJ.isValidSync(value)}
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
                    validateSync={(value) => validateCRMV.isValidSync(value)}
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
                        validateSync={(value) => validatePhone.isValidSync(value)}
                        placeholder="Digite o seu Número de Telefone"
                        required
                    />
                </div>

                <div className="w-1/2">
                    <FieldPhone
                        label="WhatsApp Comercial"
                        validateSync={(value) =>
                            validateWhatsApp.isValidSync(value)
                        }
                        name="contact.whatsapp"
                        placeholder="Digite o seu Número do WhatsApp"
                        required
                    />
                </div>
            </div>
            <div className="flex items-center justify-center flex-grow w-full">
                <SwitchControl onChange={copyPhoneToWhatsApp} size="sm">
                    <p className="flex flex-row items-center justify-center gap-1 text-xs font-semibold">
                        Clique aqui para duplicar o telefone no campo ao lado:
                        <FaWhatsapp className="text-xl text-green-600" />
                    </p>
                </SwitchControl>
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
        </section>
    )
}

export default StepSignUpPerson
