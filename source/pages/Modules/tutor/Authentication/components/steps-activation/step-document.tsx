import { useFormikContext } from 'formik'

import { useMemo } from 'react'

import { BtnPrimary } from '~/Components/atoms/btn'

import { cnpj, cpf } from 'cpf-cnpj-validator'
import * as Yup from 'yup'
import FieldDocument from '~/Components/molecules/field-document'
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
    const { values } = useFormikContext<ActivateAccount>()

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
