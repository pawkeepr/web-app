import Link from 'next/link';
import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import AuthSlider from '~/Components/organism/auth-carousel';
import FooterAuth from '~/Components/organism/footer-auth';

import HeaderTitle from '~/Components/atoms/header-title';
import LOADING from '~/constants/loading';
import useAuth from '~/hooks/use-auth';
import Auth from './components/organism/auth';

const CoverSignIn = () => {

    const {
        isLoading,
    } = useAuth()

    const disabled = isLoading === LOADING.PENDING

    return (
        <React.Fragment>
            <HeaderTitle title="Sign In" />
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay" />

                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden">
                                    <Row className="g-0">
                                        <AuthSlider bg='auth-bg-image-3' />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <div>
                                                    <h5 className="text-primary">Bem Vindo!</h5>
                                                    <p className="text-muted">Entre para ter acesso a todas as funcionalidades.</p>
                                                </div>
                                                <div className="mt-4" >

                                                    {!disabled && <Auth />}

                                                    {disabled && (
                                                        <div className="d-flex justify-content-center">
                                                            <div className="spinner-border text-primary" role="status" style={{
                                                                width: '5rem',
                                                                height: '5rem'
                                                            }}>
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Você não tem uma conta ? <Link href="/sign-up" className="fw-bold text-primary text-decoration-underline"> Registre-se</Link> </p>
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