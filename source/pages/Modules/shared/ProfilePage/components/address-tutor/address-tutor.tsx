//Import images

import FieldCep from '~/Components/molecules/field-cep/field-cep'
import FieldControl, {
    ModeInput,
} from '~/Components/molecules/field-control/field-control'

import { useCallback, useMemo, useTransition } from 'react'
import type { IAddress } from '~/helpers/fetch-address-by-cep'
import useFetchAddress from '~/hooks/use-fetch-address'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { IProfile } from '~/types/profile'

type StepTutorProps = {
    disabled?: boolean
    mode?: ModeInput
}

const AddressTutor = ({ mode = ModeInput.editable }: StepTutorProps) => {
    const { values, setFieldValue, initialValues } =
        useFormikContextSafe<IProfile>()

    const [isPending, startTransition] = useTransition()

    const updateAddressFields = useCallback(
        (params: IAddress) => {
            if (!params) return

            const { uf, localidade, bairro, logradouro, complemento } = params

            startTransition(() => {
                setFieldValue('user_information.address.state', uf || '')

                setFieldValue('user_information.address.city', localidade || '')

                setFieldValue('user_information.address.neighborhood', bairro || '')

                setFieldValue('user_information.address.street', logradouro || '')

                setFieldValue(
                    'user_information.address.complement',
                    complemento || '',
                )
            })
        },
        [setFieldValue],
    )

    const { loading } = useFetchAddress({
        onChangeAddress: updateAddressFields,
        zipCode: values.user_information?.address?.zipCode || '',
        initialValue: initialValues.user_information?.address?.zipCode || '',
    })

    const isLoading = useMemo(() => isPending || loading, [isPending, loading])

    return (
        <>
            <FieldCep
                mode={mode}
                ctx={values}
                label="CEP"
                name="user_information.address.zipCode"
                disabled={isLoading}
                placeholder="Digite o CEP"
                required
            />

            <FieldControl
                mode={mode}
                ctx={values}
                type="text"
                label="Estado"
                name="user_information.address.state"
                disabled={isLoading}
                placeholder={
                    isLoading ? 'Carregando...' : 'Digite o nome do estado'
                }
                required
            />

            <FieldControl
                mode={mode}
                ctx={values}
                type="text"
                label="Cidade"
                name="user_information.address.city"
                disabled={isLoading}
                placeholder={
                    isLoading ? 'Carregando...' : 'Digite o nome da cidade'
                }
                required
            />
            <FieldControl
                mode={mode}
                ctx={values}
                type="text"
                label="Bairro"
                name="user_information.address.neighborhood"
                disabled={isLoading}
                placeholder={
                    isLoading ? 'Carregando...' : 'Digite o nome do bairro'
                }
                required
            />
            <FieldControl
                mode={mode}
                ctx={values}
                type="text"
                label="Rua"
                name="user_information.address.street"
                disabled={isLoading}
                placeholder={isLoading ? 'Carregando...' : 'Digite o nome da rua'}
                required
            />
            <FieldControl
                mode={mode}
                ctx={values}
                type="text"
                label="Número"
                name="user_information.address.number"
                disabled={isLoading}
                placeholder={
                    isLoading ? 'Carregando...' : 'Digite o numero da casa'
                }
            />
            <FieldControl
                mode={mode}
                ctx={values}
                type="text"
                label="Complemento"
                divClassName="col-span-full w-full"
                name="user_information.address.complement"
                disabled={isLoading}
                placeholder={isLoading ? 'Carregando...' : 'Complemento'}
            />
        </>
    )
}

export default AddressTutor
