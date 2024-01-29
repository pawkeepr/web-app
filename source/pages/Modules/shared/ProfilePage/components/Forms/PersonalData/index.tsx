import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

const PersonalData = () => {
    return (
        <Form>
            <Row>
                <Col lg={6}>
                    <div className="mb-3">
                        <Form.Label htmlFor="firstnameInput" className="form-label">
                            First Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="firstnameInput"
                            placeholder="Enter your firstname"
                        />
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="mb-3">
                        <Form.Label htmlFor="lastnameInput" className="form-label">
                            Last Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="lastnameInput"
                            placeholder="Enter your lastname"
                        />
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="mb-3">
                        <Form.Label
                            htmlFor="phonenumberInput"
                            className="form-label"
                        >
                            Phone Number
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="phonenumberInput"
                            placeholder="Enter your phone number"
                        />
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="mb-3">
                        <Form.Label htmlFor="emailInput" className="form-label">
                            Email Address
                        </Form.Label>
                        <Form.Control
                            type="email"
                            className="form-control"
                            id="emailInput"
                            placeholder="Enter your email"
                        />
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Form.Label htmlFor="cityInput" className="form-label">
                            City
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="cityInput"
                            placeholder="City"
                        />
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Form.Label htmlFor="countryInput" className="form-label">
                            Country
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="countryInput"
                            placeholder="Country"
                        />
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Form.Label htmlFor="zipcodeInput" className="form-label">
                            Zip Code
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            minLength={5}
                            maxLength={6}
                            id="zipcodeInput"
                            placeholder="Enter zipcode"
                        />
                    </div>
                </Col>
                <Col lg={12}>
                    <div className="mb-3 pb-2">
                        <Form.Label
                            htmlFor="exampleFormControlTextarea"
                            className="form-label"
                        >
                            Description
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            className="form-control"
                            id="exampleFormControlTextarea"
                            rows={3}
                        />
                    </div>
                </Col>
                <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                        <Button type="button" className="btn-primary">
                            Atualizar
                        </Button>
                        <Button type="button" className="btn-success">
                            Cancelar
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
    )
}

export default PersonalData
