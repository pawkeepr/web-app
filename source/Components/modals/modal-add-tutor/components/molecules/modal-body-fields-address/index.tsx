import React,{ useCallback, useState } from 'react';
import { useFormikContext } from "formik";
import FieldControl from "~/Components/molecules/field-control/field-control";
import Col from 'react-bootstrap/Col';
import MaskedInput from 'react-input-mask';
import useFetchAddress from "~/hooks/use-fetch-address";
import { IAddress } from "~/helpers/fetch-address-by-cep";

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
    <>                        
        <Col lg={3}>
            <div>
                <FieldControl
                    label="CEP"
                    name="cep"
                    className="form-control"
                    placeholder="Cep"
                    type="text"
                    component={MaskedInput as any}
                    mask={"99999-999"}
                    required
                />

            </div>
        </Col>

        <Col lg={4}>
            <FieldControl
                divClassName='my-1'
                className="form-control"
                type="text"
                label="Estado"
                name="state"
                placeholder={loading ? 'buscando...' : 'Estado'}
                disabled={disabledInputs.state || loading}
                required
            />
        </ Col>

        <Col lg={5}>
            <FieldControl
                divClassName='my-1'
                className="form-control"
                type="text"
                label="Cidade"
                name="city"       
                disabled={disabledInputs.city || loading}
                placeholder={loading ? 'buscando...' : 'Cidade'}                      
                required
            />
        </Col>

        <Col lg={5}>
            <FieldControl
                divClassName='my-1'
                className="form-control"
                type="text"
                label="Bairro"
                name="neighborhood"
                disabled={disabledInputs.neighborhood || loading}
                placeholder={loading ? 'buscando...' : 'Bairro'}
                required
            />
        </Col>

        <Col lg={7}>
            <FieldControl
                divClassName='my-1'
                label='Rua'
                name="street"
                aria-label="street"
                className="form-control w-70"
                disabled={disabledInputs.street || loading}
                placeholder={loading ? 'buscando...' : 'Rua'}
                required
                disabledError
            />
        </Col>

        <Col lg={12}>
            <FieldControl
                divClassName='my-1'
                className="form-control"
                type="text"
                label="Complemento"
                name="complement"
                disabled={disabledInputs.complement || loading}
                placeholder={loading ? 'buscando...' : 'Complemento (opcional)'}
            />
        </Col>
    </>
  )
};

export default ModalBodyFieldsAddress;
