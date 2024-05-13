import { useCallback, useMemo, useState } from 'react'

import validateLocation, {
    locationState,
    locationValidation,
    locationZipCode,
} from '~/validations/address'

import { BtnNeutral, BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control/field-control'
import type { IAddress } from '~/helpers/fetch-address-by-cep'
import useFetchAddress from '~/hooks/use-fetch-address'

import FieldMasked from '~/Components/molecules/field-masked'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import useNextStep from '~/hooks/use-next-step'
import type { ActivateAccount } from '~/validations/activate'
import type { StepProps } from './types'

const StepSignUpAddress = ({ nextStep, prevStep }: StepProps) => {
    const [disabledInputs, setDisabledInputs] = useState({
        state: false,
        city: false,
        neighborhood: false,
        street: false,
        complement: false,
    })

    const { values, setFieldValue } = useFormikContextSafe<ActivateAccount>()
    const { zipCode } = values.location

    const updateAddressFields = useCallback(
        (params: IAddress) => {
            if (!params) return

            const { uf, localidade, bairro, logradouro, complemento } = params
            setFieldValue('location.state', uf || '')

            setFieldValue('location.city', localidade || '')

            setFieldValue('location.neighborhood', bairro || '')

            setFieldValue('location.street', logradouro || '')

            setFieldValue('location.complement', complemento || '')

            setDisabledInputs({
                state: !!uf,
                city: !!localidade,
                neighborhood: !!bairro,
                street: !!logradouro,
                complement: !!complemento,
            })
        },
        [setFieldValue],
    )

    const { cpfNotFound, loading } = useFetchAddress({
        onChangeAddress: updateAddressFields,
        zipCode: zipCode as string,
    })

    const requiredValid = useMemo((): boolean => {
        const isValid = validateLocation.isValidSync(values?.location)

        return isValid
    }, [values?.location])

    useNextStep(nextStep, requiredValid, 5000)

    return (
        <section className="flex flex-row flex-wrap w-full">
            <div className="flex flex-col items-center justify-center flex-grow w-1/3">
                <FieldMasked
                    ctx={values}
                    label="CEP"
                    validateSync={(value) => locationZipCode.isValidSync(value)}
                    name="location.zipCode"
                    placeholder="Digite o CEP"
                    mask={'_____-___'}
                    required
                />
                {cpfNotFound && (
                    <legend className="w-full text-xs text-center text-gray-400">
                        CEP não encontrado, preencha manualmente os campos.
                    </legend>
                )}
            </div>
            <FieldControl
                ctx={values}
                divClassName="flex-grow w-1/3 "
                validateSync={(value) => locationState.isValidSync(value)}
                type="text"
                label="Estado"
                name="location.state"
                disabled={disabledInputs.state || loading}
                placeholder={loading ? 'Carregando...' : 'Digite o nome do estado'}
                required
            />
            <FieldControl
                ctx={values}
                type="text"
                validateSync={(value) => locationValidation.isValidSync(value)}
                label="Cidade"
                name="location.city"
                disabled={disabledInputs.city || loading}
                placeholder={loading ? 'Carregando...' : 'Digite o nome da cidade'}
                required
                divClassName="flex-grow w-1/3 "
            />
            <FieldControl
                ctx={values}
                type="text"
                validateSync={(value) => locationValidation.isValidSync(value)}
                label="Bairro"
                name="location.neighborhood"
                disabled={loading}
                placeholder={loading ? 'Carregando...' : 'Digite o nome do bairro'}
                required
                divClassName="flex-grow w-1/3 "
            />

            <FieldControl
                ctx={values}
                divClassName="flex-grow w-1/3 "
                label="Rua"
                validateSync={(value) => locationValidation.isValidSync(value)}
                name="location.street"
                aria-label="street"
                disabled={loading}
                placeholder={loading ? 'Carregando...' : 'Digite o nome da rua'}
                required
                disabledError
            />

            <FieldControl
                ctx={values}
                divClassName="flex-grow w-1/4 "
                label="N°"
                name="location.number"
                aria-label="number"
                disabled={loading}
                validateSync={(value) => locationValidation.isValidSync(value)}
                placeholder="N°"
                required
            />

            <FieldControl
                ctx={values}
                divClassName="flex-grow w-full"
                type="text"
                label="Complemento"
                name="location.complement"
                disabled={loading}
                placeholder={
                    loading ? 'Carregando...' : 'Digite o complemento (opcional)'
                }
            />

            <div className="flex items-center justify-center w-full gap-2 mt-1">
                <BtnNeutral
                    outline
                    className="border-none"
                    onClick={prevStep}
                    label="Voltar"
                />
                <BtnPrimary
                    onClick={nextStep}
                    disabled={!requiredValid || loading}
                    label="Próximo"
                />
            </div>
        </section>
    )
}

export default StepSignUpAddress
