import Link from 'next/link';
import React, { FormEvent } from 'react';
import { Button, Input, Label } from 'reactstrap';

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
                        onClick={onToggleVisiblePassword}
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
                    checked={rememberMe}
                    onChange={onToggleRememberMe}
                    id="auth-remember-check"
                />
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
    )
}

export default ColAuth