
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";
//Import images
import MaskedInput from 'react-input-mask';

import { useFormikContext } from "formik";
import { useCallback, useState } from "react";
import CountrySelect from '~/Components/molecules/country-select/country-select';
import FieldControl from "~/Components/molecules/field-control/field-control";
import { IAddress } from "~/helpers/fetch-address-by-cep";
import useFetchAddress from "~/hooks/use-fetch-address";
import { InitialValues } from "~/pages/AppointmentsPage/Appointments";
import { StepProps } from './types';

const StepAddress = ({ activeTab, toggleTab }: StepProps) => {

    const [disabledInputs, setDisabledInputs] = useState({ state: false, city: false, neighborhood: false, street: false, complement: false })

    const { values, setFieldValue } = useFormikContext<InitialValues>()

    const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setFieldValue('tutor.address.number', value)
    }

    const updateAddressFields = useCallback(
        (params: IAddress) => {
            if (!params) return

            const { uf, localidade, bairro, logradouro, complemento } = params
            setFieldValue('tutor.address.state', uf || '')

            setFieldValue('tutor.address.city', localidade || '')

            setFieldValue('tutor.address.neighborhood', bairro || '')

            setFieldValue('tutor.address.street', logradouro || '')

            setFieldValue('tutor.address.complement', complemento || '')

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

    const { loading } = useFetchAddress({ onChangeAddress: updateAddressFields, zipCode: values.tutor?.address?.zipCode || '' })


    return (
        <>
            <div>
                <h5>Endereço do Tutor</h5>
                <p className="text-muted">
                    Informações sobre o endereço do Tutor
                </p>
            </div>

            <div>
                <Row className="g-3">
                    <Col sm={12}>
                        <CountrySelect className="mb-2" />
                    </Col>
                    <Col sm={2}>
                        <FieldControl
                            divClassName='my-1'
                            className="form-control"
                            type="text"
                            initialFocus
                            label="CEP"
                            name="tutor.address.zipCode"
                            placeholder="Digite o CEP"
                            component={MaskedInput as any}
                            mask={"99999-999"}
                            required
                        />
                    </Col>
                    <Col sm={5}>
                        <FieldControl
                            divClassName='my-1'
                            className="form-control"
                            type="text"
                            label="Estado"
                            name="tutor.address.state"
                            disabled={disabledInputs.state || loading}
                            placeholder={loading ? 'Carregando...' : 'Digite o nome do estado'}
                            required
                        />
                    </Col>

                    <Col sm={5}>
                        <FieldControl
                            divClassName='my-1'
                            className="form-control"
                            type="text"
                            label="Cidade"
                            name="tutor.address.city"
                            disabled={disabledInputs.city || loading}
                            placeholder={loading ? 'Carregando...' : 'Digite o nome da cidade'}
                            required
                        />
                    </Col>

                    <Col sm={12}>
                        <FieldControl
                            divClassName='my-1'
                            className="form-control"
                            type="text"
                            label="Bairro"
                            name="tutor.address.neighborhood"
                            disabled={disabledInputs.neighborhood || loading}
                            placeholder={loading ? 'Carregando...' : 'Digite o nome do bairro'}
                            required
                        />
                    </Col>

                    <Col sm={10}>
                        <FieldControl
                            divClassName='my-1'
                            label='Rua'
                            name="tutor.address.street"
                            aria-label="street"
                            className="form-control w-70"
                            disabled={disabledInputs.street || loading}
                            placeholder={loading ? 'Carregando...' : 'Digite o nome da rua'}
                            required
                            disabledError
                        />
                    </Col>

                    <Col sm={2} >
                        <FieldControl
                            divClassName='my-1'
                            name="tutor.address.number"
                            aria-label="number"
                            placeholder="N°"
                            required
                            label='Número'
                            onChange={onChangeNumber}
                            className='form-control'

                        />
                    </Col>

                    <FieldControl
                        divClassName='my-1'
                        className="form-control"
                        type="text"
                        label="Complemento"
                        name="tutor.address.complement"
                        disabled={disabledInputs.complement || loading}
                        placeholder={loading ? 'Carregando...' : "Digite o complemento (opcional)"}
                    />


                </Row>

                <hr className="my-4 text-muted" />


            </div>
            <div className="d-flex align-items-start gap-3 mt-4">
                <button
                    type="button"
                    className="btn btn-light btn-label previestab"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                >
                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                    Back to Billing Info
                </button>
                <button
                    type="button"
                    className="btn btn-success btn-label right ms-auto nexttab"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                >
                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                    Go to Payment
                </button>
            </div>
        </>
    )
}

export default StepAddress