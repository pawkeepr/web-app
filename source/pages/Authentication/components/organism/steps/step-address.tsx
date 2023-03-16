

import type { InitialStateSignUp } from '../../../SignUp';

import { useFormikContext } from 'formik';
import Container from 'react-bootstrap/Container';
import Address from '../../molecules/address/address';

import { useCallback, useMemo, useState } from 'react';

import MaskedInput from 'react-input-mask';
import validateAddress from '~/validations/address';

import ErrMessage from '~/Components/atoms/err-message';
import CountrySelect from '~/Components/molecules/country-select';
import FieldControl from '~/Components/molecules/field-control/field-control';
import { IAddress } from '~/helpers/fetch-address-by-cep';
import useFetchAddress from '~/hooks/use-fetch-address';
import { StepProps } from './types';

const StepSignUpAddress = ({ nextStep, prevStep, ...rest }: StepProps) => {

    const [disabledInputs, setDisabledInputs] = useState({ state: false, city: false, neighborhood: false, street: false, complement: false })

    const { values, setFieldValue } = useFormikContext<InitialStateSignUp>()
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
        return validateAddress.isValidSync(address) && !cepInvalid
    }, [address, cepInvalid])

    return (
        <div className="p-lg-5 p-4">
            <div>
                <h5 className="text-primary">Criar Conta</h5>
                <p className="text-muted">Crie uma conta PawKeeprs gratuita agora e aproveite.</p>
            </div>

            <Container className="d-flex flex-column mt-4">
                <CountrySelect />
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
                    <button className="btn btn-success w-40 m-1" type="button" onClick={prevStep}>Anterior</button>
                    <button
                        className="btn btn-success w-40 m-1 next"
                        type="button"
                        onClick={nextStep}
                        disabled={!requiredFieldsFilled || loading}
                    >
                        Próximo
                    </button>
                </div>
            </Container>

        </div>
    )
}

export default StepSignUpAddress