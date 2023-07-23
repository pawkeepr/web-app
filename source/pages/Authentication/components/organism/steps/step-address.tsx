


import { useFormikContext } from 'formik';

import { useCallback, useMemo, useState } from 'react';

import MaskedInput from 'react-input-mask';
import validateAddress from '~/validations/address';

import BtnCancel from '~/Components/atoms/btn/btn-cancel';
import BtnSuccess from '~/Components/atoms/btn/btn-success';
import FieldControl from '~/Components/molecules/field-control/field-control';
import { IAddress } from '~/helpers/fetch-address-by-cep';
import useFetchAddress from '~/hooks/use-fetch-address';


import Address from '../../molecules/address/address';

import useNextStep from '~/hooks/use-next-step';
import { ActivateAccount } from '~/validations/activate';
import { StepProps } from './types';


const StepSignUpAddress = ({ nextStep, prevStep, ...rest }: StepProps) => {
    const [disabledInputs, setDisabledInputs] = useState({ state: false, city: false, neighborhood: false, street: false, complement: false })

    const { values, setFieldValue } = useFormikContext<ActivateAccount>()
    const { zipCode } = values

    const updateAddressFields = useCallback(
        (params: IAddress) => {
            if (!params) return

            const { uf, localidade, bairro, logradouro, complemento } = params
            setFieldValue('state', uf || '')

            setFieldValue('city', localidade || '')

            setFieldValue('neighborhood', bairro || '')

            setFieldValue('street', logradouro || '')

            setFieldValue('complement', complemento || '')

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

    const requiredValid = useMemo((): boolean => {
        const isValid = validateAddress.isValidSync(values) && !cepInvalid

        return isValid
    }, [cepInvalid, values])

    useNextStep(nextStep, requiredValid, 1000)

    return (

        <div className="container grid grid-cols-2 mobile:grid-cols-1 gap-1">

            <FieldControl
                divClassName='my-1'
                className="form-control"
                type="text"
                initialFocus
                label="CEP"
                name="zipCode"
                placeholder="Digite o CEP"
                component={MaskedInput as any}
                mask={"99999-999"}
                required
            />
            <Address loading={loading} disabledInputs={disabledInputs} />

            <div className="mt-1 flex justify-center items-center col-span-full">
                <BtnCancel onClick={prevStep} label="Anterior" className="m-1" />
                <BtnSuccess label="Próximo" className="m-1" onClick={nextStep} disabled={!requiredValid || loading} />
            </div>
        </div>

    )
}

export default StepSignUpAddress