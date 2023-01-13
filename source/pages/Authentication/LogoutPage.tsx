'use client';

import Link from 'next/link';
import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';

import AuthSlider from '~/Components/organism/auth-carousel';

const LogoutPage = () => {
    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden">
                                    <Row className="justify-content-center g-0">
                                        <AuthSlider bg='auth-bg-image-2' />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4 text-center">
                                                {/* icon de um emoji chorando */}
                                                <div className="mt-4 pt-2">
                                                    <h4>Você acabou de sair 😭</h4>
                                                    <p className="text-muted">Obrigado por usar <span className="fw-bold">PawKeeprs</span>, não esqueça de voltar</p>
                                                    <div className="mt-4">
                                                        <Link href="/sign-in" className="btn btn-success w-100">Entrar</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    );
};

export default LogoutPage;