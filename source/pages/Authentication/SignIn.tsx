import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { Button, Card, Col, Container, Input, Label, Row } from 'reactstrap';
import AuthSlider from '~/Components/organism/auth-carousel';
import FooterAuth from '~/Components/organism/footer-auth';

import HeaderTitle from '~/Components/atoms/header-title';
import LOADING from '~/constants/loading';
import { useAuth } from '~/contexts/auth-context';
import { onChangePassword, onChangeUsername, onToggleVisiblePassword } from '~/store/auth/loginV2/slice';
import { useAppDispatch } from '~/store/hooks';

const CoverSignIn = () => {

    const dispatch = useAppDispatch()

    const [remember, setRemember] = useState(false);

    const {
        signIn,
        isLoading,
        password,
        username,
        visiblePassword
    } = useAuth()



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signIn({
            username,
            password
        })
    }

    const toggleVisiblePassword = () => {
        dispatch(onToggleVisiblePassword())
    }

    const extractTargetValue = (callback: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(callback(e.target.value))
    }

    const toggleRemember = () => {
        setRemember(!remember)
    }


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

                                                <div className="mt-4">
                                                    <form onSubmit={handleSubmit} >

                                                        <div className="mb-3">
                                                            <Label htmlFor="username" className="form-label">Nome do Usuário:</Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                id="username"
                                                                placeholder="Digite seu nome de usuário"
                                                                required
                                                                value={username}
                                                                onChange={extractTargetValue(onChangeUsername)}
                                                            />
                                                        </div>

                                                        <div className="mb-3">
                                                            <div className="float-end">
                                                                <Link href="/forget-password" className="text-muted">Esqueceu a Senha?</Link>
                                                            </div>
                                                            <Label className="form-label" htmlFor="password-input">Senha</Label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input
                                                                    type={visiblePassword ? "text" : "password"}
                                                                    className="form-control pe-5 password-input"
                                                                    placeholder="Digite sua senha"
                                                                    id="password-input"
                                                                    required
                                                                    value={password}
                                                                    onChange={extractTargetValue(onChangePassword)}
                                                                />
                                                                <button
                                                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                                    type="button"
                                                                    id="password-addon"
                                                                    onClick={toggleVisiblePassword}
                                                                >
                                                                    {
                                                                        visiblePassword ?
                                                                            <i className="ri-eye-off-fill align-middle"></i> :
                                                                            <i className="ri-eye-fill align-middle"></i>
                                                                    }
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="form-check">
                                                            <Input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value=""
                                                                checked={remember}
                                                                onChange={toggleRemember}
                                                                id="auth-remember-check"
                                                            />
                                                            <Label className="form-check-label" htmlFor="auth-remember-check">Lembrar-me</Label>
                                                        </div>

                                                        <div className="mt-4">
                                                            <Button color="success" className="w-100" type="submit" disabled={disabled}>Entrar</Button>
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