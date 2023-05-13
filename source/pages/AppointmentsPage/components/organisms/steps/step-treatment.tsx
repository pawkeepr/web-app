import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//Import images

import { StepProps } from './types';

import { BtnAvatar, BtnLabel, BtnSuccess } from '~/Components/atoms/btn';


const StepTreatment = ({ toggleTab, activeTab }: StepProps) => {
    return (
        <>
            <div>
                <h5>Tratamento</h5>

            </div>

            <div>



                <Row className="g-3">

                    <BtnAvatar alt='Avatar de Tutor' name="tutor.avatar" disabled />

                    <Col sm={6}>

                    </Col>

                    <Col sm={6}>

                    </Col>

                    <Col xs={12}>

                    </Col>

                </Row>
            </div>

            <div className="flex align-items-center justify-end gap-3 mt-4">
                <BtnLabel 
                    link
                    type="button"
                    className="right ms-auto previestab"
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                >
                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                    Voltar
                </BtnLabel>
                <BtnSuccess
                    type="button"
                    className="btn-label right ms-auto nexttab"
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                >
                    Próximo
                    <i className="ri-check-line label-icon align-middle fs-16 ms-2"></i>
                </BtnSuccess>
            </div>
        </>
    )
}

export default StepTreatment