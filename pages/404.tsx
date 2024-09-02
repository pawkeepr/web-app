import Link from 'next/link'
import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'

const Alt404 = () => {
    return (
        <React.Fragment>
            <div className="py-5 auth-page-wrapper auth-bg-cover d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay" />
                <div className="overflow-hidden auth-page-content pt-lg-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col xl={5}>
                                <Card className="overflow-hidden">
                                    <CardBody className="p-4">
                                        <div className="text-center">
                                            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                                            <lord-icon
                                                className="avatar-xl"
                                                src="https://cdn.lordicon.com/spxnqpau.json"
                                                trigger="loop"
                                                colors="primary:#405189,secondary:#0ab39c"
                                                style={{
                                                    width: '120px',
                                                    height: '120px',
                                                }}
                                            ></lord-icon>
                                            <h1 className="mb-4 text-primary">
                                                Oops !
                                            </h1>
                                            <h4 className="mb-2 text-uppercase">
                                                Desculpe, página não encontrada 😭
                                                <br />
                                                <strong>
                                                    {window.location.pathname}
                                                </strong>
                                            </h4>

                                            <Link
                                                href="/sign-in"
                                                className="btn btn-success"
                                            >
                                                <i className="mdi mdi-home me-1" />
                                                Voltar para o Login
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Alt404
