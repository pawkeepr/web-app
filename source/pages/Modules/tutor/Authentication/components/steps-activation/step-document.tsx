import { useEffect, useMemo } from 'react'

import { BtnPrimary } from '~/Components/atoms/btn'

import { cnpj, cpf } from 'cpf-cnpj-validator'
import * as Yup from 'yup'
import FieldDocument from '~/Components/molecules/field-document'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { useTutorProfileFromVet } from '~/store/hooks/profile/use-profile'
import type { ActivateAccount } from '../../activate'
import type { StepProps } from './types'

const validationDocument = Yup.string()
    .required('Este campo é obrigatório')
    .transform((value) => value.replace(/[^\d]/g, ''))
    .test('cpf-cnpj-validator', 'CPF/CNPJ inválido', (value) => {
        if (!value) return false
        return cpf.isValid(value) || cnpj.isValid(value)
    })

const StepSignUpDocument = ({ nextStep }: StepProps) => {
    const { values, setFieldValue } = useFormikContextSafe<ActivateAccount>()

    const { data, isPending } = useTutorProfileFromVet({
        cpf_cnpj: values.cpf_cnpj,
    })

    useEffect(() => {
        if (!data) return
        setFieldValue('id', data.id)
        setFieldValue('firstName', data.user_information?.first_name)
        setFieldValue('lastName', data.user_information?.last_name)
        setFieldValue(
            'contact.whatsapp',
            data.user_information?.contact?.whatsapp ||
                data.user_information?.contact?.phone,
        )

        setFieldValue('location', {
            country: 'BR',
            street: data.user_information?.address?.street,
            number: data.user_information?.address?.number,
            complement: data.user_information?.address?.complement,
            neighborhood: data.user_information?.address?.neighborhood,
            city: data.user_information?.address?.city,
            state: data.user_information?.address?.state,
            zipCode: data.user_information?.address?.zipCode,
        })
    }, [data])

    const requiredValid = useMemo((): boolean => {
        const isValid = validationDocument.isValidSync(values.cpf_cnpj)

        return isValid
    }, [values])

    return (
        <div className="flex flex-col items-center justify-center gap-1">
            <FieldDocument
                ctx={values}
                label="CPF/CNPJ"
                name="cpf_cnpj"
                aria-label="cpf_cnpj"
                placeholder="CPF/CNPJ"
                required
            />
            {isPending && requiredValid && <p>Carregando...</p>}
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

export default StepSignUpDocument
