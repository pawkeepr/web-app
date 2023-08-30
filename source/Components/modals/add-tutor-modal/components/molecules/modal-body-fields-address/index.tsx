import { useFormikContext } from "formik";
import { useCallback, useState } from 'react';
import MaskedInput from 'react-input-mask';
import FieldControl from "~/Components/molecules/field-control/field-control";
import { IAddress } from "~/helpers/fetch-address-by-cep";
import useFetchAddress from "~/hooks/use-fetch-address";

const ModalBodyFieldsAddress = () => {
    const { values, setFieldValue } = useFormikContext<any>();
    const [disabledInputs, setDisabledInputs] = useState({ state: false, city: false, neighborhood: false, street: false, complement: false })

    const updateAddressFields = useCallback(
        (address: IAddress) => {
            if (!address) return;

            const { uf, localidade, bairro, logradouro, complemento } = address;

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
                complement: !!complemento
            })
        },
        [setFieldValue]
    )

    const { loading } = useFetchAddress({
        zipCode: values?.cep || '',
        onChangeAddress: updateAddressFields,
    })

    return (
        <div className="grid grid-cols-3 ">
            <FieldControl
                label="CEP"
                name="cep"
                placeholder="Cep"
                type="text"
                component={MaskedInput as any}
                mask={"99999-999"}
                required
            />


            <FieldControl
                divClassName='my-1'
                className=" "
                type="text"
                label="Estado"
                name="state"
                placeholder={loading ? 'buscando...' : 'Estado'}
                disabled={disabledInputs.state || loading}
                required
            />

            <FieldControl
                divClassName='my-1'
                className=" "
                type="text"
                label="Cidade"
                name="city"
                disabled={disabledInputs.city || loading}
                placeholder={loading ? 'buscando...' : 'Cidade'}
                required
            />

            <FieldControl
                divClassName='my-1'
                className=" "
                type="text"
                label="Bairro"
                name="neighborhood"
                disabled={disabledInputs.neighborhood || loading}
                placeholder={loading ? 'buscando...' : 'Bairro'}
                required
            />

            <FieldControl
                divClassName='my-1'
                label='Rua'
                name="street"
                aria-label="street"
                className="  w-70"
                disabled={disabledInputs.street || loading}
                placeholder={loading ? 'buscando...' : 'Rua'}
                required
                disabledError
            />

            <FieldControl
                divClassName='my-1'
                className=" "
                type="text"
                label="Complemento"
                name="complement"
                disabled={disabledInputs.complement || loading}
                placeholder={loading ? 'buscando...' : 'Complemento (opcional)'}
            />
        </div>
    )
};

export default ModalBodyFieldsAddress;
