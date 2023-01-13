import Link from 'next/link';
import React from 'react';
import { Button, Card, Col, Container, Input, Label, Row } from 'reactstrap';
import AuthSlider from '~/Components/organism/auth-carousel';
import FooterAuth from '~/Components/organism/footer-auth';

const CoverSignIn = () => {

    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>

                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden">
                                    <Row className="g-0">
                                        <AuthSlider />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <div>
                                                    <h5 className="text-primary">Bem Vindo!</h5>
                                                    <p className="text-muted">Entre para ter acesso a todas as funcionalidades.</p>
                                                </div>

                                                <div className="mt-4">
                                                    <form action="/">

                                                        <div className="mb-3">
                                                            <Label htmlFor="username" className="form-label">Nome do Usuário:</Label>
                                                            <Input type="text" className="form-control" id="username" placeholder="Digite seu username" required />
                                                        </div>

                                                        <div className="mb-3">
                                                            <div className="float-end">
                                                                <Link href="/forget-password" className="text-muted">Esqueceu a Senha?</Link>
                                                            </div>
                                                            <Label className="form-label" htmlFor="password-input">Senha</Label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input type="password" className="form-control pe-5 password-input" placeholder="Digite sua senha" id="password-input" required />
                                                                <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i className="ri-eye-fill align-middle"></i></button>
                                                            </div>
                                                        </div>

                                                        <div className="form-check">
                                                            <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                            <Label className="form-check-label" htmlFor="auth-remember-check">Lembrar-me</Label>
                                                        </div>

                                                        <div className="mt-4">
                                                            <Button color="success" className="w-100" type="submit">Entrar</Button>
                                                        </div>

                                                        <div className="mt-4 text-center">
                                                            <div className="signin-other-title">
                                                                <h5 className="fs-14 mb-4 title">Logar Com:</h5>
                                                            </div>

                                                            <div>
                                                                {/* <Button color="primary" className="btn-icon me-1"><i className="ri-facebook-fill fs-16"></i></Button> */}
                                                                <Button color="danger" className="btn-icon me-1"><i className="ri-google-fill fs-16"></i></Button>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Você não tem uma conta ? <a href="/sing-up" className="fw-bold text-primary text-decoration-underline"> Registre-se</a> </p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <FooterAuth />

            </div>
        </React.Fragment>
    );
};

export default CoverSignIn;