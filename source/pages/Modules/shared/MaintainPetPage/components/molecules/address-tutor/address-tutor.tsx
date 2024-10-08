//Import images

import FieldCep from '~/Components/molecules/field-cep/field-cep'
import FieldControl, {
    ModeInput,
} from '~/Components/molecules/field-control/field-control'

import { useCallback, useMemo, useTransition } from 'react'
import type { IAddress } from '~/helpers/fetch-address-by-cep'
import useFetchAddress from '~/hooks/use-fetch-address'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { InitialValues } from '~/pages/Modules/shared/MaintainPetPage'

type CtxAddress = Pick<InitialValues, 'ownerEmergencyContact'>

type StepTutorProps = {
    disabled?: boolean
    mode?: ModeInput
}

const AddressTutor = ({ mode = ModeInput.editable }: StepTutorProps) => {
    const { values, setFieldValue, initialValues } =
        useFormikContextSafe<CtxAddress>()

    const [isPending, startTransition] = useTransition()

    const updateAddressFields = useCallback(
        (params: IAddress) => {
            if (!params) return

            const { uf, localidade, bairro, logradouro, complemento } = params

            startTransition(() => {
                setFieldValue('ownerEmergencyContact.address.state', uf || '')

                setFieldValue(
                    'ownerEmergencyContact.address.city',
                    localidade || '',
                )

                setFieldValue(
                    'ownerEmergencyContact.address.neighborhood',
                    bairro || '',
                )

                setFieldValue(
                    'ownerEmergencyContact.address.street',
                    logradouro || '',
                )

                setFieldValue(
                    'ownerEmergencyContact.address.complement',
                    complemento || '',
                )
            })
        },
        [setFieldValue],
    )

    const { loading } = useFetchAddress({
        onChangeAddress: updateAddressFields,
        zipCode: values.ownerEmergencyContact?.address?.zipCode || '',
        initialValue: initialValues.ownerEmergencyContact?.address?.zipCode || '',
    })

    const isLoading = useMemo(() => isPending || loading, [isPending, loading])

    return (
        <>
            <FieldCep
                mode={mode}
                ctx={values}
                label="CEP"
                name="ownerEmergencyContact.address.zipCode"
                disabled={isLoading}
                placeholder="Digite o CEP"
                required
            />

            <FieldControl
                mode={mode}
                ctx={values}
                type="text"
                label="Estado"
                name="ownerEmergencyContact.address.state"
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
                name="ownerEmergencyContact.address.city"
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
                name="ownerEmergencyContact.address.neighborhood"
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
                name="ownerEmergencyContact.address.street"
                disabled={isLoading}
                placeholder={isLoading ? 'Carregando...' : 'Digite o nome da rua'}
                required
            />
            <FieldControl
                mode={mode}
                ctx={values}
                type="text"
                label="Número"
                name="ownerEmergencyContact.address.number"
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
                name="ownerEmergencyContact.address.complement"
                disabled={isLoading}
                placeholder={isLoading ? 'Carregando...' : 'Complemento'}
            />
        </>
    )
}

export default AddressTutor
