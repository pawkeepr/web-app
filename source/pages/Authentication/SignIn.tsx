import Link from 'next/link';
import { useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import AuthSlider from '~/Components/organism/auth-carousel';

import LOADING from '~/constants/loading';
import AuthInputs from './components/organism/auth-inputs';

import { useRouter } from 'next/navigation';
import LogoSimpleMobile from '~/Components/atoms/logo-simple-mobile';
import { resetLoading } from '~/store/auth/login/actions';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import AuthLayout from '../_layouts/auth/auth_layout';

const CoverSignIn = () => {
    const router = useRouter()
    const { isAuthenticated, isLoading } = useAppSelector(state => state.Login)
    const dispatch = useAppDispatch()

    const loading = isLoading === LOADING.PENDING || isLoading === LOADING.SUCCESS

    useEffect(() => {

        if (isAuthenticated) {
            dispatch(resetLoading())
            router.push('/dashboard')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])

    return (
        <AuthLayout title='Entrar'>
            <Row className="g-0">
                <AuthSlider bg='auth-bg-image-3' classNames='d-none d-sm-block' />

                <Col lg={6}>
                    <div className="p-lg-5 p-4 items-center flex-col justify-center h-100">
                        <div className='flex flex-col items-center justify-center mb-1'>
                            <LogoSimpleMobile className='block' />
                            <div className="text-center">
                                <h5 className="text-primary">Seja bem Vindo!</h5>
                                {/* <p className="text-muted">Entre para ter acesso a todas as funcionalidades.</p> */}
                            </div>
                        </div>
                        <div className="mt-4" >
                            {loading && (
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border text-primary" role="status" style={{
                                        width: '5rem',
                                        height: '5rem'
                                    }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}

                            {!loading && <AuthInputs />}

                        </div>

                        <div className="mt-5 text-center">
                            <p className="mb-0">Você não tem uma conta ? <br />
                                <Link href="/sign-up" className="font-bold text-primary-600 no-underline d-none d-sm-block"> Registre-se</Link>
                                <Link href="/sign-up" className="font-bold text-secondary-600 no-underline d-sm-none"> Registre-se</Link>
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </AuthLayout>
    );
};

export default CoverSignIn;