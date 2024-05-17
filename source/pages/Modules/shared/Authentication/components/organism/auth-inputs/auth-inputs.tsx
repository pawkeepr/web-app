import useAuth from '~/hooks/use-auth'
import { useAppDispatch } from '~/store/hooks'
import { onChangePassword, onChangeUsername } from '~/store/slices/auth/login/slice'

import { useMemo, type ChangeEvent } from 'react'
import FieldControl from '~/Components/molecules/field-control'

import { Form, Formik } from 'formik'
import type { SignInCredentials } from '~/services/helpers/auth'

import * as Yup from 'yup'
import { BtnLink, BtnPrimary } from '~/Components/atoms/btn'
import FieldPassword from '~/Components/molecules/field-password/field-password'
import LOADING from '~/constants/loading'

const initialValues: SignInCredentials = {
    username: '',
    password: '',
}

const validationSchema = Yup.object({
    username: Yup.string().email().required('Este campo é obrigatório'),
    password: Yup.string().required('Este campo é obrigatório'),
})

type CtxSchema = Yup.InferType<typeof validationSchema>

const Auth = () => {
    const dispatch = useAppDispatch()

    const { signIn, password, username, isAuthenticated, isLoading } = useAuth()

    const handleSubmit = () => {
        signIn({
            username,
            password,
        })
    }

    const isValid: boolean = useMemo(() => {
        return validationSchema.isValidSync({ password, username })
    }, [password, username])

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(onChangeUsername(e.target.value))
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(onChangePassword(e.target.value))
    }

    const loading = useMemo(
        () => isLoading === LOADING.SUCCESS && isAuthenticated,
        [isLoading, isAuthenticated],
    )

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="w-full p-2">
                    <FieldControl
                        ctx={{} as CtxSchema}
                        label="Email"
                        type="text"
                        pattern="[^\s]+" // no spaces
                        name="username"
                        placeholder="Digite seu email"
                        data-testid="email-input"
                        value={username}
                        onChange={handleChangeUsername}
                        disabledError
                    />

                    <div className="flex flex-col items-end justify-center w-full mb-3 position-relative">
                        <FieldPassword
                            label="Senha"
                            ctx={{} as CtxSchema}
                            placeholder="Digite sua senha"
                            name="password"
                            data-testid="password-input"
                            value={password}
                            onChange={handleChangePassword}
                            disabledError
                        />
                        <BtnLink
                            message="Esqueceu a senha?"
                            href="/forgot-password"
                            className="z-10 flex items-center content-end justify-end p-0 m-0 text-xs font-semibold h-fit w-fit"
                        />
                    </div>
                    <BtnPrimary
                        label="Entrar"
                        className="!w-full"
                        type="submit"
                        data-testid="submit-button"
                        disabled={!isValid || loading}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default Auth
