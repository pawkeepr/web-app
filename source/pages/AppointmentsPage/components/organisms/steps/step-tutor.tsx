import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//Import images

import FieldControl from "~/Components/molecules/field-control/field-control";
import { StepProps } from './types';

import MaskedInput from 'react-input-mask';
import { BtnAvatar } from '~/Components/atoms/btn';
import FieldDocument from "~/Components/molecules/field-document/field-document";


const StepTutor = ({ toggleTab, activeTab }: StepProps) => {
    return (
        <>
            <div>
                <h5>Tutor</h5>
                <p className="text-muted">
                    Informações sobre o Tutor do Pet
                </p>
            </div>

            <div>

                <Row className="g-3">

                    <BtnAvatar alt='Avatar de Tutor' name="tutor.avatar" disabled />

                    <Col sm={6}>
                        <FieldDocument
                            label='CPF'
                            divClassName='my-1'
                            name="tutor.document"
                            aria-label="document"
                            className="form-control"
                            onlyCPF
                            placeholder="Digite o CPF do Tutor"
                            component={MaskedInput as any}
                            required
                        />
                    </Col>

                    <Col sm={6}>
                        <FieldControl
                            initialFocus
                            divClassName='my-1'
                            label='Nome Completo'
                            name="tutor.name"
                            aria-label="name"
                            className="form-control"
                            placeholder="Digite o nome do Tutor"
                            required
                            disabledError
                        />
                    </Col>

                    <Col xs={12}>
                        <FieldControl
                            initialFocus
                            divClassName='my-1'
                            label='Email'
                            name="tutor.email"
                            aria-label="email"
                            className="form-control"
                            placeholder="Digite o email do tutor (opcional)"
                            required
                            disabledError
                        />
                    </Col>

                </Row>
            </div>

            <div className="d-flex align-items-start gap-3 mt-4">
                <button
                    type="button"
                    className="btn btn-success btn-label right ms-auto nexttab nexttab"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                >
                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                    Go to Shipping
                </button>
            </div>
        </>
    )
}

export default StepTutor