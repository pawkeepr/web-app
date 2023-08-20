
import useAuth from "~/hooks/use-auth";
import { onChangePassword, onChangeUsername } from "~/store/auth/login/slice";
import { useAppDispatch } from "~/store/hooks";

import { ChangeEvent, useMemo } from "react";
import FieldControl from "~/Components/molecules/field-control";

import { Form, Formik } from "formik";
import { SignInCredentials } from "~/services/helpers/auth";

import cn from "classnames";
import * as Yup from "yup";
import { BtnLink, BtnPrimary } from "~/Components/atoms/btn";
import FieldPassword from "~/Components/molecules/field-password/field-password";

const initialValues: SignInCredentials = {
    username: "",
    password: "",
};

const validationSchema = Yup.object({
    username: Yup.string().email().required("Este campo é obrigatório"),
    password: Yup.string().required("Este campo é obrigatório"),
});

const Auth = () => {
    const dispatch = useAppDispatch();

    const {
        signIn,
        password,
        username,
        isAuthenticated,
    } = useAuth();

    const handleSubmit = () => {
        signIn({
            username,
            password,
        });
    };

    const isValid: boolean = useMemo(() => {
        return validationSchema.isValidSync({ password, username });
    }, [password, username]);

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(onChangeUsername(e.target.value));
    };

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(onChangePassword(e.target.value));
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-3">
                        <FieldControl
                            label="Email"
                            type="text"
                            pattern="[^\s]+" // no spaces
                            className=" "
                            name="username"
                            placeholder="Digite seu email"
                            data-testid="email-input"
                            value={username}
                            onChange={handleChangeUsername}
                            disabledError
                        />
                    </div>

                    <div className="mb-3">
                        <div className="position-relative mb-3">

                            <BtnLink
                                message="Esqueceu a senha?"
                                href="/forgot-password"
                                className="
                                    h-fit
                                    text-xs
                                    absolute
                                    z-10
                                    font-semibold
                                    p-0
                                    m-0
                                    top-0
                                    right-0
                                "
                            />

                            <FieldPassword
                                label="Senha"
                                className={cn("  pe-5 password-input border-end-0")}
                                placeholder="Digite sua senha"
                                name="password"
                                data-testid="password-input"
                                value={password}
                                onChange={handleChangePassword}
                                disabledError
                            />

                        </div>
                    </div>
                    <BtnPrimary
                        label="Entrar"
                        className="w-full"
                        type="submit"
                        data-testid="submit-button"
                        disabled={!isValid || isAuthenticated}
                    />


                </Form>
            )}
        </Formik>
    );
};

export default Auth;
