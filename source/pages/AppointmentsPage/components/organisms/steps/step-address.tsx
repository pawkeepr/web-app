
import {
    Col,
    Input,
    Label,
    Row
} from "reactstrap";
//Import images

import { StepProps } from './types';

const StepAddress = ({ activeTab, toggleTab }: StepProps) => {
    return (
        <>
            <div>
                <h5>Shipping Address</h5>
                <p className="text-muted">
                    Fill all information below
                </p>
            </div>

            <div>
                <Row className="g-3">
                    <Col xs={12}>
                        <Label
                            htmlFor="address"
                            className="form-label"
                        >
                            Address
                        </Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="1234 Main St"
                        />
                    </Col>

                    <Col xs={12}>
                        <Label
                            htmlFor="address2"
                            className="form-label"
                        >
                            Address 2{" "}
                            <span className="text-muted">
                                (Optional)
                            </span>
                        </Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="address2"
                            placeholder="Apartment or suite"
                        />
                    </Col>

                    <Col md={5}>
                        <Label
                            htmlFor="country"
                            className="form-label"
                        >
                            Country
                        </Label>
                        <select
                            className="form-select"
                            id="country"
                        >
                            <option defaultValue="">Choose...</option>
                            <option>United States</option>
                        </select>
                    </Col>

                    <Col md={4}>
                        <Label
                            htmlFor="state"
                            className="form-label"
                        >
                            State
                        </Label>
                        <select className="form-select" id="state">
                            <option defaultValue="">Choose...</option>
                            <option>California</option>
                        </select>
                    </Col>

                    <Col md={3}>
                        <Label htmlFor="zip" className="form-label">
                            Zip
                        </Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="zip"
                            placeholder=""
                        />
                    </Col>
                </Row>

                <hr className="my-4 text-muted" />

                <div className="form-check mb-2">
                    <Input
                        type="checkbox"
                        className="form-check-input"
                        id="same-address"
                    />
                    <Label
                        className="form-check-label"
                        htmlFor="same-address"
                    >
                        Shipping address is the same as my billing
                        address
                    </Label>
                </div>

                <div className="form-check">
                    <Input
                        type="checkbox"
                        className="form-check-input"
                        id="save-info"
                    />
                    <Label
                        className="form-check-label"
                        htmlFor="save-info"
                    >
                        Save this information for next time
                    </Label>
                </div>
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