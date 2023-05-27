import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ChangePass = () => {
  return (
    <Form>
        <Row className="g-2">
            <Col lg={4}>
                <div>
                    <Form.Label 
                        htmlFor="oldpasswordInput" 
                        className="form-label">
                            Old Password*
                        </Form.Label>
                    <Form.Control 
                        type="password" 
                        className="form-control"
                        id="oldpasswordInput"
                        placeholder="Enter current password" 
                    />
                </div>
            </Col>

            <Col lg={4}>
                <div>
                    <Form.Label 
                        htmlFor="newpasswordInput" 
                        className="form-label"
                    >
                        New Password*
                    </Form.Label>
                    <Form.Control 
                        type="password" 
                        className="form-control"
                        id="newpasswordInput" 
                        placeholder="Enter new password" 
                    />
                </div>
            </Col>

            <Col lg={4}>
                <div>
                    <Form.Label 
                        htmlFor="confirmpasswordInput" 
                        className="form-label"
                    >
                        Confirm Password*
                    </Form.Label>
                    <Form.Control 
                        type="password" 
                        className="form-control"
                        id="confirmpasswordInput"
                        placeholder="Confirm password" 
                    />
                </div>
            </Col>

            <Col lg={12}>
                <div className="mb-3">
                    <Link 
                        href="#"
                        className="link-primary text-decoration-underline"
                    >
                        Forgot Password ?
                    </Link>
                </div>
            </Col>

            <Col lg={12}>
                <div className="text-end">
                    <button type="button" className="btn btn-success">Change
                        Password</button>
                </div>
            </Col>
        </Row>
    </Form>
  )
}

export default ChangePass;
