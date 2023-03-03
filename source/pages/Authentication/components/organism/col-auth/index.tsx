import Link from 'next/link';
import React, { FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useAuth } from '~/contexts/auth-context';
import { onChangePassword, onChangeUsername } from '~/store/auth/loginV2/slice';
import { useAppDispatch } from '~/store/hooks';


const ColAuth = () => {
    const dispatch = useAppDispatch()

    const {
        signIn,
        password,
        username,
        onToggleRememberMe,
        onToggleVisiblePassword,
        rememberMe,
        visiblePassword
    } = useAuth()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //const encryptVar = encrypt(password)
        //console.log({ encryptVar, decrypt: decrypt(encryptVar) })
        signIn({
            username,
            password,
        })
    }

    const extractTargetValue = (callback: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(callback(e.target.value))
    }

    return (
        <Form.Group onSubmit={handleSubmit} >

            <div className="mb-3">
                <Form.Label htmlFor="username" className="form-label">Nome do Usuário:</Form.Label>
                <Form.Control
                    type="text"
                    className="form-control"
                    name="username"
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
                <Form.Label className="form-label" htmlFor="password-input">Senha</Form.Label>
                <div className="position-relative auth-pass-inputgroup mb-3">
                    <InputGroup>
                        <Form.Control
                            type={visiblePassword ? "text" : "password"}
                            className="form-control pe-5 password-input border-end-0"
                            placeholder="Digite sua senha"
                            name="password"
                            required
                            value={password}
                            onChange={extractTargetValue(onChangePassword)}
                        />

                        <InputGroup.Text className="bg-transparent border-start-0">
                            <i onClick={onToggleVisiblePassword} className={visiblePassword ? 'ri-eye-off-fill' : 'ri-eye-fill'}></i>
                        </InputGroup.Text>
                    </InputGroup>
                    {/* <button
                        className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                        type="button"
                        name="password-addon"
                        onClick={onToggleVisiblePassword}
                    >
                        {
                            visiblePassword ?
                                <i className="ri-eye-off-fill align-mnamedle"></i> :
                                <i className="ri-eye-fill align-mnamedle"></i>
                        }
                    </button> */}
                </div>
            </div>

            <div className="form-check">
                <Form.Check
                    value=""
                    name="auth-remember-check"
                    checked={rememberMe}
                    onChange={onToggleRememberMe}
                />
                <Form.Label className="form-check-label" htmlFor="auth-remember-check">Lembrar-me</Form.Label>
            </div>

            <div className="mt-4">
                <Button color="success" className="w-100" type="submit">Entrar</Button>
            </div>
            {/*
                <div className="mt-4 text-center">
                    <div className="signin-other-title">
                        <h5 className="fs-14 mb-4 title">Logar Com:</h5>
                    </div>


                    <Button color="primary" className="btn-icon me-1"><i className="ri-facebook-fill fs-16"></i></Button>
                    <Button className="btn-icon me-1 btn-danger"><i className="ri-google-fill fs-16"></i></Button>
                
                </div>
             */}
        </Form.Group>
    )
}

export default ColAuth