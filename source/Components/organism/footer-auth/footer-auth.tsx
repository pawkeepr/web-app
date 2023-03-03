import { Col, Container, Row } from "reactstrap"

const FooterAuth = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="text-center">
                            <p className="mb-0">&copy; {2023} PawKeeprs. </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default FooterAuth