


import { useFormikContext } from 'formik';

import { useCallback, useEffect, useMemo, useState } from 'react';

import MaskedInput from 'react-input-mask';
import validateAddress from '~/validations/address';

import BtnCancel from '~/Components/atoms/btn/btn-cancel';
import BtnSuccess from '~/Components/atoms/btn/btn-success';
import ErrMessage from '~/Components/atoms/err-message';
import CountrySelect from '~/Components/molecules/country-select';
import FieldControl from '~/Components/molecules/field-control/field-control';
import { IAddress } from '~/helpers/fetch-address-by-cep';
import useFetchAddress from '~/hooks/use-fetch-address';
import { AccountSignUp } from '~/store/auth/register/types';


import Address from '../../molecules/address/address';
import Container from '../../template/container';

import useDebounce from '~/hooks/use-debounce';
import useThrottle from '~/hooks/use-throttle';
import { StepProps } from './types';


const StepSignUpAddress = ({ nextStep, prevStep, ...rest }: StepProps) => {
    const [step, setStep] = useState(true)
    const debounce = useDebounce()

    const [disabledInputs, setDisabledInputs] = useState({ state: false, city: false, neighborhood: false, street: false, complement: false })

    const { values, setFieldValue } = useFormikContext<AccountSignUp>()
    const { address } = values
    const { zipCode } = address

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

    const requiredFieldsFilled = useMemo((): boolean => {
        const isValid = validateAddress.isValidSync(address) && !cepInvalid

        if (isValid) {
            setStep(true)
        }

        return isValid
    }, [address, cepInvalid])

    const nextStepThrottle = useThrottle(nextStep, 1000)

    useEffect(() => {
        if (requiredFieldsFilled && step) {
            debounce(() => nextStepThrottle(), 1000)
        }

        return () => {
            setStep(false)
        }
    }, [requiredFieldsFilled, nextStepThrottle, step, debounce])

    return (
        <Container>

            <div className="container d-flex flex-column mt-4">
                <CountrySelect className="mb-2" />
                <FieldControl
                    className="form-control"
                    type="text"
                    label="CEP"
                    name="address.zipCode"
                    placeholder="Digite o CEP"
                    component={MaskedInput as any}
                    mask={"99999-999"}
                    required
                />
                {cepInvalid && <ErrMessage message={'CEP não encontrado'} />}
                <Address loading={loading} disabledInputs={disabledInputs} />

                <div className="mt-4 d-flex justify-content-center">
                    <BtnCancel onClick={prevStep} label="Anterior" className="m-1" />
                    <BtnSuccess label="Próximo" className="m-1" onClick={nextStep} disabled={!requiredFieldsFilled || loading} />
                </div>
            </div>

        </Container>
    )
}

export default StepSignUpAddress