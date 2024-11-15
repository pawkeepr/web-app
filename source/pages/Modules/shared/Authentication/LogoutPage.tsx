'use client'

import { useAppDispatch } from '~/store/hooks'

import { useEffect } from 'react'
import { BtnLink } from '~/Components/atoms/btn'
import useProfile from '~/store/hooks/profile/use-profile'
import { resetLoading, signOutUser } from '~/store/slices/auth/login/actions'
import type { TypeProfile } from '~/types/profile'
import AuthLayout from '../../_layouts/auth/auth_layout'

const LogoutPage = () => {
    const dispatch = useAppDispatch()
    const { data: profile } = useProfile()

    useEffect(() => {
        dispatch(
            signOutUser({
                type_profile: profile?.type_profile as TypeProfile,
            }),
        )
        dispatch(resetLoading())
    }, [])

    return (
        <AuthLayout title="Sair">
            <div className="flex flex-col items-center justify-center">
                {/* icon de um emoji chorando */}
                <div className="pt-2 mt-4 text-center">
                    <h4>Você acabou de sair 😭</h4>
                    <p className="text-gray-400">
                        Obrigado por usar a{' '}
                        <span className="font-semibold text-gray-500">
                            PawKeepr
                        </span>
                        , não se esqueça de voltar
                    </p>
                    <BtnLink
                        href="sign-in"
                        className="!w-full !bg-primary-500 !text-white"
                        message="Entrar"
                    />
                </div>
            </div>
        </AuthLayout>
    )
}

export default LogoutPage
