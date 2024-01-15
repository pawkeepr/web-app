'use client'
import { BtnCancel, BtnLink, BtnPrimary } from '~/Components/atoms/btn'
import AuthLayout from '../_layouts/auth/auth_layout'

const ConfirmationPage = () => {
    return (
        <AuthLayout title="Activation Profile">
            <div className="flex flex-col justify-center items-center gap-3 lg:mt-5">
                <p className="text-sm font-bold text-secondary-500">
                    Seja Bem-vindo(a)!
                </p>
                <h1 className="font-sans text-xl font-bold mb-4">
                    Confirmar Agendamento
                </h1>
            </div>

            <div className="flex flex-row justify-center items-center">
                <BtnPrimary
                    label="Confirmar Consulta"
                    className="w-2/4"
                    onClick={() => {}}
                />
                <BtnCancel
                    label="Cancelar Consulta"
                    className="w-2/4"
                    onClick={() => {}}
                />
            </div>
            <div className="w-full flex flex-col justify-center items-center ">
                <p className="-mb-2 text-gray-400 font-normal">
                    Você não tem uma conta? Crie agora mesmo e obtenha todos os
                    benefícios da plataforma
                </p>
                <BtnLink message="Criar Conta" href="/sign-up" />
            </div>
        </AuthLayout>
    )
}

export default ConfirmationPage
