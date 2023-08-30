import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//Import images

import FieldControl from "~/Components/molecules/field-control/field-control";

import { useFormikContext } from 'formik';
import { useCallback, useMemo, useState, useTransition } from 'react';
import MaskedInput from 'react-input-mask';
import { IAddress } from '~/helpers/fetch-address-by-cep';
import useFetchAddress from '~/hooks/use-fetch-address';
import { InitialValues } from '../../../Appointments';

type StepsecondTutorProps = {
    disabled?: boolean
}

const StepsecondTutor = ({ disabled }: StepsecondTutorProps) => {
    const [disabledInputs, setDisabledInputs] = useState({
        state: false,
        city: false,
        neighborhood: false,
        street: false,
        complement: false
    })

    const { values, setFieldValue } = useFormikContext<InitialValues>()

    const [isPending, startTransition] = useTransition()

    const updateAddressFields = useCallback(
        (params: IAddress) => {
            if (!params) return

            const { uf, localidade, bairro, logradouro, complemento } = params

            startTransition(() => {
                setFieldValue('secondTutor.address.state', uf || '')

                setFieldValue('secondTutor.address.city', localidade || '')

                setFieldValue('secondTutor.address.neighborhood', bairro || '')

                setFieldValue('secondTutor.address.street', logradouro || '')

                setFieldValue('secondTutor.address.complement', complemento || '')

                setDisabledInputs({
                    state: !!uf,
                    city: !!localidade,
                    neighborhood: !!bairro,
                    street: !!logradouro,
                    complement: !!complemento,
                })
            })
        },
        [setFieldValue],
    )

    const { loading } = useFetchAddress({ onChangeAddress: updateAddressFields, zipCode: values.secondTutor?.address?.zipCode || '' })


    const isLoading = useMemo(() => isPending || loading, [isPending, loading])

    return (
        <div>

            <Row className="g-3">


                <Col xs={12}>
                    <FieldControl
                        initialFocus
                        divClassName='my-1'
                        label='Email'
                        name="secondTutor.email"
                        aria-label="email"
                        disabled={disabled}
                        
                        placeholder="Digite o email do secondTutor (opcional)"
                        required
                        disabledError
                    />
                </Col>

                <Col sm={2}>
                    <FieldControl
                        divClassName='my-1'
                        
                        type="text"
                        initialFocus
                        label="CEP"
                        name="secondTutor.address.zipCode"
                        disabled={disabled || isLoading}
                        placeholder="Digite o CEP"
                        component={MaskedInput as any}
                        mask={"99999-999"}
                        required
                    />
                </Col>
                <Col sm={3}>
                    <FieldControl
                        divClassName='my-1'
                        type="text"
                        label="Estado"
                        name="secondTutor.address.state"
                        disabled={(disabledInputs.state || disabled) || isLoading}
                        placeholder={isLoading ? 'Carregando...' : 'Digite o nome do estado'}
                        required
                    />
                </Col>

                <Col sm={3}>
                    <FieldControl
                        divClassName='my-1'
                        type="text"
                        label="Cidade"
                        name="secondTutor.address.city"
                        disabled={(disabledInputs.city || disabled) || isLoading}
                        placeholder={isLoading ? 'Carregando...' : 'Digite o nome da cidade'}
                        required
                    />
                </Col>

                <Col sm={4}>
                    <FieldControl
                        divClassName='my-1'
                        type="text"
                        label="Rua"
                        name="secondTutor.address.street"
                        disabled={(disabledInputs.street || disabled) || isLoading}
                        placeholder={isLoading ? 'Carregando...' : 'Digite o nome da rua'}
                        required
                    />
                </Col>
            </Row>
        </div>


    )
}

export default StepsecondTutor