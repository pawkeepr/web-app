import { useFormikContext } from 'formik';

import { useCallback, useMemo, useState } from 'react';

import validateAddress from '~/validations/address';

import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn';
import FieldControl from '~/Components/molecules/field-control/field-control';
import { IAddress } from '~/helpers/fetch-address-by-cep';
import useFetchAddress from '~/hooks/use-fetch-address';



import FieldMasked from '~/Components/molecules/field-masked';
import useNextStep from '~/hooks/use-next-step';
import { ActivateAccount } from '~/validations/activate';
import { StepProps } from './types';


const StepSignUpAddress = ({ nextStep, prevStep, ...rest }: StepProps) => {
    const [disabledInputs, setDisabledInputs] = useState({
        state: false,
        city: false,
        neighborhood: false,
        street: false,
        complement: false
    })

    const { values, setFieldValue } = useFormikContext<ActivateAccount>()
    const { zipCode } = values.address

    const updateAddressFields = useCallback(
        (params: IAddress) => {
            if (!params) return

            const { uf, localidade, bairro, logradouro, complemento } = params
            setFieldValue('address.state', uf || '')

            setFieldValue('address.city', localidade || '')

            setFieldValue('address.neighborhood', bairro || '')

            setFieldValue('address.street', logradouro || '')

            setFieldValue('address.complement', complemento || '')

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

    const { cepInvalid, loading } = useFetchAddress({ onChangeAddress: updateAddressFields, zipCode })

    const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setFieldValue('address.number', value)
    }

    const requiredValid = useMemo((): boolean => {
        const isValid = validateAddress.isValidSync(values?.address) && !cepInvalid

        return isValid
    }, [cepInvalid, values?.address])

    useNextStep(nextStep, requiredValid, 1000)

    return (

        <div className="container grid grid-cols-2 mobile:grid-cols-1 gap-1">

            <FieldMasked
                label="CEP"
                name="address.zipCode"
                placeholder="Digite o CEP"
                mask={"_____-___"}
                required
            />

            <FieldControl
                className=" "
                type="text"
                label="Estado"
                name="address.state"
                disabled={disabledInputs.state || loading}
                placeholder={loading ? 'Carregando...' : 'Digite o nome do estado'}
                required
            />
            <FieldControl
                type="text"
                label="Cidade"
                name="address.city"
                disabled={disabledInputs.city || loading}
                placeholder={loading ? 'Carregando...' : 'Digite o nome da cidade'}
                required
            />
            <FieldControl
                type="text"
                label="Bairro"
                name="address.neighborhood"
                disabled={loading}
                placeholder={loading ? 'Carregando...' : 'Digite o nome do bairro'}
                required
            />

            <div className="grid grid-cols-4 mobile:grid-cols-1 col-span-full w-full gap-1">
                <FieldControl
                    divClassName="col-span-3"
                    label='Rua'
                    name="address.street"
                    aria-label="street"
                    disabled={loading}
                    placeholder={loading ? 'Carregando...' : 'Digite o nome da rua'}
                    required
                    disabledError
                />

                <FieldControl
                    divClassName="col-span-1"
                    label='N°'
                    name="address.number"
                    aria-label="number"
                    disabled={loading}
                    placeholder="N°"
                />

            </div>

            <div className="col-span-full">

                <FieldControl
                    type="text"
                    label="Complemento"
                    name="address.complement"
                    disabled={loading}
                    placeholder={loading ? 'Carregando...' : "Digite o complemento (opcional)"}
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