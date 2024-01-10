import { useEffect } from 'react'

import LOADING from '~/constants/loading'
import AuthInputs from './components/organism/auth-inputs'

import { useRouter } from 'next/navigation'
import { BtnLink } from '~/Components/atoms/btn'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { resetLoading } from '~/store/slices/auth/login/actions'
import AuthLayout from '../_layouts/auth/auth_layout'

const CoverSignIn = () => {
    const router = useRouter()
    const { isAuthenticated, isLoading } = useAppSelector((state) => state.Login)
    const dispatch = useAppDispatch()

    const loading = isLoading === LOADING.PENDING

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(resetLoading())
            router.push('/dashboard')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])

    return (
        <AuthLayout title="Entrar" image="/bg-sign-in.webp" alt="Imagem" hasImage>
            <div className="flex flex-col justify-center items-center gap-3 lg:mt-5">
                <p className="text-sm font-bold text-secondary-500">
                    Seja Bem-vindo(a)!
                </p>
            </div>
            <div className="mobile:!mt-0 mobile:p-0">
                {loading && (
                    <div className="flex justify-center item-center">
                        <div
                            className="spinner-border text-primary-500 w-40 h-40 my-4"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                {!loading && <AuthInputs />}
            </div>

            <div className="w-full flex flex-col justify-center items-center ">
                <p className="-mb-2 text-gray-400 font-normal">
                    Você não tem uma conta ?
                </p>
                <BtnLink message="Criar Conta" href="/sign-up" />
            </div>
        </AuthLayout>
    )
}

export default CoverSignIn
