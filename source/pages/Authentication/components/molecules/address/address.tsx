import { useFormikContext } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import MaskedInput from 'react-input-mask';
import Loader from '~/Components/Common/Loader';
import FieldControl from '~/Components/molecules/field-control/field-control';
import { fetchAddressByCep } from '~/helpers/fetch-address-by-cep';


const Address = () => {
    const [loading, setLoading] = useState(false)
    const { values, setFieldValue } = useFormikContext()
    const zipCode = (values as any).address.zipCode

    const setAddress = useCallback(
        (data: any) => {
            setFieldValue('address.state', data.uf)
            setFieldValue('address.city', data.localidade)
            setFieldValue('address.neighborhood', data.bairro)
            setFieldValue('address.street', data.logradouro)
            setFieldValue('address.complement', data.complemento)
        },
        [setFieldValue],
    )


    useEffect(() => {

        if (zipCode.replace(/\D/g, '').length === 8) {
            setLoading(true)
            fetchAddressByCep(zipCode)
                .then((data) => {
                    setAddress(data)
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoading(false)
                    }, 1000)
                })
        }
    }, [zipCode, setAddress])


    return (
        <>
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
            {loading && <Loader loading={loading} />}
            {!loading && (
                <div>
                    <FieldControl
                        className="form-control"
                        type="text"
                        label="Estado"
                        name="address.state"
                        placeholder="Digite o nome do estado"
                        required
                    />
                    <FieldControl
                        className="form-control"
                        type="text"
                        label="Cidade"
                        name="address.city"
                        placeholder="Digite o nome da cidade"
                        required
                    />
                    <FieldControl
                        className="form-control"
                        type="text"
                        label="Bairro"
                        name="address.neighborhood"
                        placeholder="Digite o nome do bairro"
                        required
                    />

                    <FieldControl
                        label='Rua'
                        name="address.street"
                        aria-label="street"
                        className="form-control w-70"
                        placeholder="Rua"
                        required
                        disabledError
                    >

                        <Form.Control
                            type="text"
                            name="address.number"
                            aria-label="number"
                            placeholder="Número"
                            required
                            className='ms-1 w-20'
                            style={{
                                maxWidth: '20%'
                            }}

                        />

                    </FieldControl>

                    <FieldControl
                        className="form-control"
                        type="text"
                        label="Complemento"
                        name="address.complement"
                        placeholder="Digite o complemento (opcional)"
                    />
                </div>
            )}

        </>
    )
}

export default Address