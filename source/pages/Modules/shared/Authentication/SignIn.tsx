import { useEffect } from 'react'

import { LOADING } from '~/constants/loading'

import { useRouter } from 'next/navigation'
import { BtnLink } from '~/Components/atoms/btn'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { resetLoading } from '~/store/slices/auth/login/actions'
import AuthLayout from '../../_layouts/auth/auth_layout'
import AuthInputs from './components/organism/auth-inputs'

export type CoverSignInProps = {
    mode: 'veterinary' | 'tutor'
    bgImage: '/bg-sign-in.webp' | '/bg-three.jpg' | '/bg-sign-up.webp'
}

const CoverSignIn = ({ mode, bgImage }: CoverSignInProps) => {
    const router = useRouter()
    const { isLoading } = useAppSelector((state) => state.Login)
    const dispatch = useAppDispatch()

    const loading = isLoading === LOADING.PENDING || isLoading === LOADING.SUCCESS

    useEffect(() => {
        if (loading) {
            router.prefetch('/dashboard')
        }

        let timeout: string | number | NodeJS.Timeout | undefined
        if (isLoading === LOADING.SUCCESS) {
            timeout = setTimeout(() => {
                router.push('/dashboard')
            }, 3000)
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [isLoading])

    useEffect(() => {
        return () => {
            dispatch(resetLoading())
        }
    }, [])

    const link = mode === 'veterinary' ? '/veterinary/sign-up' : '/tutor/sign-up'

    return (
        <AuthLayout
            title="Entrar"
            image={bgImage}
            alt="Imagem"
            hasImage
            loading={LOADING.SUCCESS === isLoading}
        >
            <div className="flex flex-col justify-center items-center">
                <p className="text-sm font-bold text-secondary-500">
                    Seja Bem-vindo(a)!
                </p>
            </div>
            <div className="mobile:!mt-0 mobile:p-0 web:p-4">
                {loading && (
                    <div className="flex justify-center item-center web:min-h-[236px]">
                        <div
                            className="spinner-border text-primary-500 w-44 h-44 my-4"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                {!loading && (
                    <div className="web:max-h-[236px]">
                        <AuthInputs />
                    </div>
                )}
            </div>

            <div className="w-full flex flex-col justify-center items-center ">
                <p className="-mb-2 text-gray-400 font-normal">
                    Você não tem uma conta ?
                </p>
                <BtnLink message="Criar Conta" href={link} />
            </div>
        </AuthLayout>
    )
}

export default CoverSignIn
