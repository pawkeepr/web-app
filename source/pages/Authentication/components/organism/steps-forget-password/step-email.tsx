import { BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control/field-control'
import LOADING from '~/constants/loading'
import { useAppDispatch, useAppSelector } from '~/store/hooks'

import { useEffect, type FormEventHandler } from 'react'
import { forgetPwd, resetLoading } from '~/store/slices/auth/forget-pwd/actions'

import Alert from '~/Components/atoms/alert'
import validateEmail from '~/validations/email'

type StepEmailProps = {
    email: string
    onChangeNextTab: () => void
}

const StepEmail = ({ email, onChangeNextTab }: StepEmailProps) => {
    const dispatch = useAppDispatch()

    const isLoading = useAppSelector((state) => state.ForgetPassword.isLoading)

    useEffect(() => {
        if (isLoading === LOADING.SUCCESS) {
            dispatch(resetLoading())
            setTimeout(() => {
                onChangeNextTab()
            }, 1000)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        dispatch(forgetPwd({ email }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <Alert color="warning">
                Digite seu email para receber um link de redefinição de senha.
            </Alert>

            <div className="mb-4">
                <FieldControl
                    name="email"
                    type="email"
                    label="Email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    required
                    placeholder="Digite seu email"
                    className=" "
                />
            </div>

            <div className="text-center mt-4 w-full ">
                <BtnPrimary
                    type="submit"
                    className="!w-full"
                    disabled={
                        isLoading === LOADING.PENDING ||
                        !validateEmail.isValidSync(email)
                    }
                    label="Enviar Link de Redefinição de Senha"
                />
            </div>
        </form>
    )
}

export default StepEmail
