'use client'

import PropTypes from 'prop-types'
import type React from 'react'

//import Components
import Header from './Header'

//import actions

//redux
import cn from 'classnames'
import { Suspense, useEffect } from 'react'
import ModalSearchUberVet from '~/Components/modals/search-uber-vet/search-uber-vet'
import { useBtnFloatingExpansible } from '~/Components/molecules/btn-floating-expansible'
import Drawer from '~/Components/organism/drawer'
import LoadingPage from '~/pages/Modules/shared/LoadingPage'
import { api } from '~/services/api'
import useHookLayout from './use-hook'

type LayoutProps = {
    children: React.ReactNode
}

const LayoutTutor = ({ children }: LayoutProps) => {
    const { isChildrenVisible } = useBtnFloatingExpansible()
    useHookLayout()
    useEffect(() => {
        // Configura um interceptador para verificar o token de autorização
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                // Verifica se o cabeçalho 'Authorization' está presente
                const token = config.headers.Authorization
                if (!token) {
                    return Promise.reject(new Error('No Authorization token found'))
                }
                return config
            },
            (error) => {
                // Lida com erros
                return Promise.reject(error)
            },
        )

        // Limpa o interceptador quando o componente é desmontado
        return () => {
            api.interceptors.request.eject(requestInterceptor)
        }
    }, [])

    return (
        <main
            id="relative"
            className="relative flex flex-col flex-1 min-h-screen bg-white"
        >
            <Header />

            <div className="block h-4 web:hidden" />
            {/* <Sidebar layoutType={layoutType} /> */}
            <Drawer mode="TUTOR" />
            <div className={cn('px-1  pt-2', 'z-[1]', 'mobile:mt-4 mobile:!pb-36')}>
                {isChildrenVisible && (
                    <div className="absolute top-0 left-0 z-[10] w-full h-screen bg-black opacity-50" />
                )}
                <ModalSearchUberVet>{() => <div />}</ModalSearchUberVet>

                <Suspense fallback={<LoadingPage />}>{children}</Suspense>
            </div>
        </main>
    )
}

LayoutTutor.propTypes = {
    children: PropTypes.object,
}

export default LayoutTutor
