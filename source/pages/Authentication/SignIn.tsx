import Link from 'next/link';
import React, { useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import AuthSlider from '~/Components/organism/auth-carousel';
import FooterAuth from '~/Components/organism/footer-auth';

import HeaderTitle from '~/Components/atoms/header-title';
import LOADING from '~/constants/loading';
import AuthInputs from './components/organism/auth-inputs';

import { useRouter } from 'next/navigation';
import LogoSimple from '~/Components/atoms/logo-simple';
import LogoSimpleMobile from '~/Components/atoms/logo-simple-mobile';
import { useAppSelector } from '~/store/hooks';

const CoverSignIn = () => {
    const router = useRouter()
    const { isAuthenticated, isLoading } = useAppSelector(state => state.Login)

    const disabled = isLoading === LOADING.PENDING

    useEffect(() => {

        if (isAuthenticated) {
            router.push('/dashboard')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])

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
                                        <AuthSlider bg='auth-bg-image-3' classNames='d-none d-sm-block' />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4 items-center flex-col justify-center h-100">
                                                <div className='flex flex-col items-center justify-center'>
                                                    <LogoSimple className='d-none d-sm-block' />
                                                    <LogoSimpleMobile className='d-sm-none' />
                                                    <div className="text-center">
                                                        <h5 className="text-primary">Seja bem Vindo!</h5>
                                                        <p className="text-muted">Entre para ter acesso a todas as funcionalidades.</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4" >
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

                                                    {!disabled && <AuthInputs />}

                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Você não tem uma conta ? <br />
                                                        <Link href="/sign-up" className="fw-bold text-primary no-underline d-none d-sm-block"> Registre-se</Link>
                                                        <Link href="/sign-up" className="fw-bold text-secondary no-underline d-sm-none"> Registre-se</Link>
                                                    </p>
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