import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid className='flex justify-center'>
                    <Row>
                        <Col >
                            <div className="m-3 mobile: text-xs">
                            2023 &copy; Design & Develop by Pawkeepr SmartCare
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default Footer;