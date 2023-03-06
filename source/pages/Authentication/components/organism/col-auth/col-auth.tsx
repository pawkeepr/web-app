import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useAuth } from '~/contexts/auth-context';
import { onChangePassword, onChangeUsername } from '~/store/auth/login/slice';
import { useAppDispatch } from '~/store/hooks';

import type { ChangeEvent, FormEvent } from 'react';

const ColAuth = () => {
    const dispatch = useAppDispatch();

    const {
        signIn,
        password,
        username,
        onToggleRememberMe,
        onToggleVisiblePassword,
        rememberMe,
        visiblePassword,
    } = useAuth();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signIn({
            username,
            password,
        });
    };

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(onChangeUsername(e.target.value));
    };

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(onChangePassword(e.target.value));
    };

    return (
        <Form.Group onSubmit={handleSubmit}>
            <div className="mb-3">
                <Form.Label htmlFor="username" className="form-label">
                    Nome do Usuário:
                </Form.Label>
                <Form.Control
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Digite seu nome de usuário"
                    required
                    value={username}
                    onChange={handleChangeUsername}
                />
            </div>

            <div className="mb-3">
                <div className="float-end">
                    <Link href="/forget-password" className="text-muted">
                        Esqueceu a Senha?
                    </Link>
                </div>
                <Form.Label className="form-label" htmlFor="password-input">
                    Senha
                </Form.Label>
                <div className="position-relative auth-pass-inputgroup mb-3">
                    <InputGroup>
                        <Form.Control
                            type={visiblePassword ? 'text' : 'password'}
                            className="form-control pe-5 password-input border-end-0"
                            placeholder="Digite sua senha"
                            name="password"
                            required
                            value={password}
                            onChange={handleChangePassword}
                        />

                        <InputGroup.Text className="bg-transparent border-start-0">
                            <i
                                onClick={onToggleVisiblePassword}
                                className={
                                    visiblePassword ? 'ri-eye-off-fill' : 'ri-eye-fill'
                                }
                            ></i>
                        </InputGroup.Text>
                    </InputGroup>
                </div>
            </div>

            <div className="form-check">
                <Form.Check
                    value=""
                    name="auth-remember-check"
                    checked={rememberMe}
                    onChange={onToggleRememberMe}
                />
                <Form.Label
                    className="form-check-label"
                    htmlFor="auth-remember-check"
                >
                    Lembrar-me
                </Form.Label>
            </div>

            <div className="mt-4">
                <Button color="success" className="w-100" type="submit">
                    Entrar
                </Button>
            </div>
        </Form.Group>
    );
};

export default ColAuth;
