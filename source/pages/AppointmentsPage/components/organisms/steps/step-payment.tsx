import {
    Col,
    Input,
    Label,
    Row
} from "reactstrap";


import { BtnLabel, BtnSuccess } from "~/Components/atoms/btn";
import { StepProps } from './types';

const StepVaccines = ({ activeTab, toggleTab }: StepProps) => {
    return (
        <>
            <div>
                <h5>Payment</h5>
                <p className="text-muted">
                    Fill all information below
                </p>
            </div>

            <div>
                <div className="my-3">
                    <div className="form-check form-check-inline">
                        <Input
                            id="credit"
                            name="paymentMethod"
                            type="radio"
                            className="form-check-input"
                            defaultChecked
                            required
                        />
                        <Label
                            className="form-check-label"
                            htmlFor="credit"
                        >
                            Credit card
                        </Label>
                    </div>
                    <div className="form-check form-check-inline">
                        <Input
                            id="debit"
                            name="paymentMethod"
                            type="radio"
                            className="form-check-input"
                            required
                        />
                        <Label
                            className="form-check-label"
                            htmlFor="debit"
                        >
                            Debit card
                        </Label>
                    </div>
                    <div className="form-check form-check-inline">
                        <Input
                            id="paypal"
                            name="paymentMethod"
                            type="radio"
                            className="form-check-input"
                            required
                        />
                        <Label
                            className="form-check-label"
                            htmlFor="paypal"
                        >
                            PayPal
                        </Label>
                    </div>
                </div>

                <Row className="gy-3">
                    <Col md={12}>
                        <Label
                            htmlFor="cc-name"
                            className="form-label"
                        >
                            Name on card
                        </Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="cc-name"
                            placeholder=""
                            required
                        />
                        <small className="text-muted">
                            Full name as displayed on card
                        </small>
                        <div className="invalid-feedback">
                            Name on card is required
                        </div>
                    </Col>

                    <Col md={6}>
                        <Label
                            htmlFor="cc-number"
                            className="form-label"
                        >
                            Credit card number
                        </Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="cc-number"
                            placeholder=""
                            required
                        />
                        <div className="invalid-feedback">
                            Credit card number is required
                        </div>
                    </Col>

                    <Col md={3}>
                        <Label
                            htmlFor="cc-expiration"
                            className="form-label"
                        >
                            Expiration
                        </Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="cc-expiration"
                            placeholder=""
                            required
                        />
                        <div className="invalid-feedback">
                            Expiration date required
                        </div>
                    </Col>

                    <Col md={3}>
                        <Label
                            htmlFor="cc-cvv"
                            className="form-label"
                        >
                            CVV
                        </Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="cc-cvv"
                            placeholder=""
                            required
                        />
                        <div className="invalid-feedback">
                            Security code required
                        </div>
                    </Col>

                </Row>

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
                    Voltar
                </button>
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

                    }}
                >
                    Finalizar
                    <i className="ri-check-line label-icon align-middle fs-16 ms-2"></i>
                </BtnSuccess>
            </div>
        </>
    )
}

export default StepVaccines

const finalizer = null