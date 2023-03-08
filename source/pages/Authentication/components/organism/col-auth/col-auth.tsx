import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import useAuth from '~/hooks/use-auth';
import { onChangePassword, onChangeUsername } from '~/store/auth/login/slice';
import { useAppDispatch } from '~/store/hooks';

import type { ChangeEvent } from 'react';
import FieldControl from '~/Components/molecules/field-control';

import { Formik } from 'formik';
import { SignInCredentials } from '~/services/helpers/auth';

import * as Yup from 'yup';

const initialValues: SignInCredentials = {
    username: '',
    password: '',
}

const validationSchema = Yup.object({
    username: Yup.string().required('Este campo é obrigatório'),
    password: Yup.string().required('Este campo é obrigatório'),
})

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

    const handleSubmit = ({ password, username }: SignInCredentials) => {
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
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {
                ({ isValid }) => (
                    <>
                        <div className="mb-3">
                            <FieldControl
                                label='Nome do Usuário:'
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Digite seu nome de usuário"
                                data-testid="username-input"
                                required
                                value={username}
                                onChange={handleChangeUsername}
                                disabledError
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
                                <FieldControl
                                    type={visiblePassword ? 'text' : 'password'}
                                    className="form-control pe-5 password-input border-end-0"
                                    placeholder="Digite sua senha"
                                    name="password"
                                    data-testid="password-input"
                                    required
                                    value={password}
                                    onChange={handleChangePassword}
                                    disabledError
                                >
                                    <InputGroup.Text className="bg-transparent border-start-0" >
                                        <i
                                            onClick={onToggleVisiblePassword}
                                            data-testid="toggle-password"
                                            className={
                                                visiblePassword ? 'ri-eye-off-fill' : 'ri-eye-fill'
                                            }
                                        ></i>
                                    </InputGroup.Text>
                                </FieldControl>
                            </div>
                        </div>

                        <Form.Check
                            type="checkbox"
                            className="w-100"
                            name="rememberMe"
                            id="rememberMe"
                            onChange={onToggleRememberMe}
                            checked={rememberMe}
                            label={
                                <p className="mb-0 fs-12 text-muted fst-italic">
                                    Lembrar-me
                                </p>
                            } />

                        <div className="mt-4">
                            <Button
                                color="success"
                                className="w-100"
                                type="submit"
                                data-testid="submit-button"
                                disabled={!isValid}
                            >
                                Entrar
                            </Button>
                        </div>
                    </>
                )
            }

        </Formik>
    );
};

export default ColAuth;
