import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//Import images

import { StepProps } from './types';

import { BtnAvatar } from '~/Components/atoms/btn';


const StepAnamnese = ({ toggleTab, activeTab }: StepProps) => {
    return (
        <>
            <div>
                <h5>Anamnese</h5>

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

export default StepAnamnese