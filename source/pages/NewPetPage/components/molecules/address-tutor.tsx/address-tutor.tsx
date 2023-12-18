//Import images

import FieldCep from "~/Components/molecules/field-cep/field-cep";
import FieldControl from "~/Components/molecules/field-control/field-control";


import { useFormikContext } from 'formik';
import { useCallback, useMemo, useState, useTransition } from 'react';
import { IAddress } from '~/helpers/fetch-address-by-cep';
import useFetchAddress from '~/hooks/use-fetch-address';

type StepTutorProps = {
    disabled?: boolean
}

const AddressTutor = ({ disabled }: StepTutorProps) => {
    const [disabledInputs, setDisabledInputs] = useState({
        state: false,
        city: false,
        neighborhood: false,
        street: false,
        complement: false
    })

    const { values, setFieldValue } = useFormikContext<any>()

    const [isPending, startTransition] = useTransition()

    const updateAddressFields = useCallback(
        (params: IAddress) => {
            if (!params) return

            const { uf, localidade, bairro, logradouro, complemento } = params

            startTransition(() => {
                setFieldValue('location_tutor.state', uf || '')

                setFieldValue('location_tutor.city', localidade || '')

                setFieldValue('location_tutor.neighborhood', bairro || '')

                setFieldValue('location_tutor.street', logradouro || '')

                setFieldValue('location_tutor.complement', complemento || '')

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

    const { loading } = useFetchAddress({ onChangeAddress: updateAddressFields, zipCode: values.location_tutor?.zipCode || '' })


    const isLoading = useMemo(() => isPending || loading, [isPending, loading])

    return (
        <>
            <FieldControl
                initialFocus
                label='Email'
                name="contact_tutor.email"
                aria-label="email"
                disabled={disabled}
                className=" "
                placeholder="Digite o email do location_tutor"
                required
                disabledError
            />

            <FieldCep
                className=" "
                label="CEP"
                name="location_tutor.zipCode"
                disabled={disabled || isLoading}
                placeholder="Digite o CEP"
                required
            />

            <FieldControl
                type="text"
                label="Estado"
                name="location_tutor.state"
                disabled={( disabled) || isLoading}
                placeholder={isLoading ? 'Carregando...' : 'Digite o nome do estado'}
                required
            />

            <FieldControl
                type="text"
                label="Cidade"
                name="location_tutor.city"
                disabled={( disabled) || isLoading}
                placeholder={isLoading ? 'Carregando...' : 'Digite o nome da cidade'}
                required
            />
            <FieldControl
                type="text"
                label="Rua"
                name="location_tutor.street"
                disabled={( disabled) || isLoading}
                placeholder={isLoading ? 'Carregando...' : 'Digite o nome da rua'}
                required
            />
        </>
    )
}

export default AddressTutor