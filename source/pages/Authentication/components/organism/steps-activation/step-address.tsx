import { useCallback, useMemo, useState } from 'react'

import validateLocation from '~/validations/address'

import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
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

    const { cepInvalid, loading } = useFetchAddress({
        onChangeAddress: updateAddressFields,
        zipCode: zipCode as string,
    })

    const requiredValid = useMemo((): boolean => {
        const isValid =
            validateLocation.isValidSync(values?.location) && !cepInvalid

        return isValid
    }, [cepInvalid, values?.location])

    useNextStep(nextStep, requiredValid, 1000)

    return (
        <div className="container grid grid-cols-2 mobile:grid-cols-1 gap-1">
            <FieldMasked
                ctx={values}
                label="CEP"
                name="location.zipCode"
                placeholder="Digite o CEP"
                mask={'_____-___'}
                required
            />

            <FieldControl
                ctx={values}
                className=" "
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
                label="Cidade"
                name="location.city"
                disabled={disabledInputs.city || loading}
                placeholder={loading ? 'Carregando...' : 'Digite o nome da cidade'}
                required
            />
            <FieldControl
                ctx={values}
                type="text"
                label="Bairro"
                name="location.neighborhood"
                disabled={loading}
                placeholder={loading ? 'Carregando...' : 'Digite o nome do bairro'}
                required
            />

            <div className="grid grid-cols-4 mobile:grid-cols-1 col-span-full w-full gap-1">
                <FieldControl
                    ctx={values}
                    divClassName="col-span-3"
                    label="Rua"
                    name="location.street"
                    aria-label="street"
                    disabled={loading}
                    placeholder={loading ? 'Carregando...' : 'Digite o nome da rua'}
                    required
                    disabledError
                />

                <FieldControl
                    ctx={values}
                    divClassName="col-span-1"
                    label="N°"
                    name="location.number"
                    aria-label="number"
                    disabled={loading}
                    placeholder="N°"
                />
            </div>

            <div className="col-span-full">
                <FieldControl
                    ctx={values}
                    type="text"
                    label="Complemento"
                    name="location.complement"
                    disabled={loading}
                    placeholder={
                        loading
                            ? 'Carregando...'
                            : 'Digite o complemento (opcional)'
                    }
                />
            </div>

            <div className="mt-1 flex justify-center items-center col-span-full">
                <BtnCancel onClick={prevStep} label="Voltar" />
                <BtnPrimary
                    onClick={nextStep}
                    disabled={!requiredValid || loading}
                    label="Próximo"
                />
            </div>
        </div>
    )
}

export default StepSignUpAddress
