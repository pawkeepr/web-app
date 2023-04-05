import {
    Col,
    Input,
    Label,
    Row
} from "reactstrap";
//Import images

import { StepProps } from './types';

const StepPet = ({ toggleTab, activeTab }: StepProps) => {
    return (
        <>
            <div>
                <h5>Billing Info</h5>
                <p className="text-muted">
                    Fill all information below
                </p>
            </div>

            <div>
                <Row className="g-3">
                    <Col sm={6}>
                        <Label
                            htmlFor="firstName"
                            className="form-label"
                        >
                            First name
                        </Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="Enter First Name"
                            defaultValue=""
                        />
                    </Col>

                    <Col sm={6}>
                        <Label
                            htmlFor="lastName"
                            className="form-label"
                        >
                            Last name
                        </Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Enter Last Name"
                            defaultValue=""
                        />
                    </Col>

                    <Col xs={12}>
                        <Label
                            htmlFor="username"
                            className="form-label"
                        >
                            Username
                        </Label>
                        <div className="input-group">
                            <span className="input-group-text">
                                @
                            </span>
                            <Input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                            />
                        </div>
                    </Col>

                    <Col xs={12}>
                        <Label
                            htmlFor="email"
                            className="form-label"
                        >
                            Email{" "}
                            <span className="text-muted">
                                (Optional)
                            </span>
                        </Label>
                        <Input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter Email"
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

export default StepPet