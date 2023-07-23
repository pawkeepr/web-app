


import { useFormikContext } from 'formik';

import { useCallback, useEffect, useMemo, useState } from 'react';

import MaskedInput from 'react-input-mask';
import validateAddress from '~/validations/address';

import BtnCancel from '~/Components/atoms/btn/btn-cancel';
import BtnSuccess from '~/Components/atoms/btn/btn-success';
import FieldControl from '~/Components/molecules/field-control/field-control';
import { IAddress } from '~/helpers/fetch-address-by-cep';
import useFetchAddress from '~/hooks/use-fetch-address';

import Form from 'react-bootstrap/Form';


import useNextStep from '~/hooks/use-next-step';
import { ActivateAccount } from '~/validations/activate';
import { StepProps } from './types';


const StepSignUpAddress = ({ nextStep, prevStep, ...rest }: StepProps) => {
    const [disabledInputs, setDisabledInputs] = useState({ state: false, city: false, neighborhood: false, street: false, complement: false })

    const { values, setFieldValue } = useFormikContext<ActivateAccount>()
    const { zipCode } = values.location

    useEffect(() => {
        console.log(values.location)
    }, [values.location])

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

    const { cepInvalid, loading } = useFetchAddress({ onChangeAddress: updateAddressFields, zipCode })

    const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setFieldValue('location.number', value)
    }

    const requiredValid = useMemo((): boolean => {
        const isValid = validateAddress.isValidSync(values?.location) && !cepInvalid

        return isValid
    }, [cepInvalid, values?.location])

    useNextStep(nextStep, requiredValid, 1000)

    return (

        <div className="container grid grid-cols-2 mobile:grid-cols-1 gap-1">

            <FieldControl
                divClassName='my-1'
                className="form-control"
                type="text"
                initialFocus
                label="CEP"
                name="location.zipCode"
                placeholder="Digite o CEP"
                component={MaskedInput as any}
                mask={"99999-999"}
                required
            />

            <FieldControl
                className="form-control"
                type="text"
                label="Estado"
                name="location.state"
                disabled={disabledInputs.state || loading}
                placeholder={loading ? 'Carregando...' : 'Digite o nome do estado'}
                required
            />
            <FieldControl
                className="form-control"
                type="text"
                label="Cidade"
                name="location.city"
                disabled={disabledInputs.city || loading}
                placeholder={loading ? 'Carregando...' : 'Digite o nome da cidade'}
                required
            />
            <FieldControl
                className="form-control"
                type="text"
                label="Bairro"
                name="location.neighborhood"
                disabled={disabledInputs.neighborhood || loading}
                placeholder={loading ? 'Carregando...' : 'Digite o nome do bairro'}
                required
            />

            <FieldControl
                label='Rua'
                name="location.street"
                aria-label="street"
                className="form-control w-70"
                disabled={disabledInputs.street || loading}
                placeholder={loading ? 'Carregando...' : 'Digite o nome da rua'}
                required
                disabledError
            >
                <Form.Control
                    type="text"
                    name="location.number"
                    aria-label="number"
                    placeholder="N°"
                    required
                    onChange={onChangeNumber}
                    className='ms-1 w-20'
                    style={{
                        maxWidth: '20%'
                    }}
                />
            </FieldControl>
            <div className="col-span-full">

                <FieldControl
                    className="form-control"
                    type="text"
                    label="Complemento"
                    name="location.complement"
                    disabled={disabledInputs.complement || loading}
                    placeholder={loading ? 'Carregando...' : "Digite o complemento (opcional)"}
                />
            </div>


            <div className="mt-1 flex justify-center items-center col-span-full">
                <BtnCancel onClick={prevStep} label="Anterior" className="m-1" />
                <BtnSuccess label="Próximo" className="m-1" onClick={nextStep} disabled={!requiredValid || loading} />
            </div>
        </div>

    )
}

export default StepSignUpAddress