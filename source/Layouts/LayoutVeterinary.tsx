'use client'

import PropTypes from 'prop-types'
import type React from 'react'
import image from '../../styles/assets/images/landing/bg-pattern.png'

//import Components
import Header from './Header'

//import actions

import cn from 'classnames'
import { Suspense } from 'react'
import FieldDocumentAppointment from '~/Components/molecules/field-appointment-vet/field-appointment-vet.mobile'
import Drawer from '~/Components/organism/drawer'
import { useBtnFloating } from '~/contexts/button-floating'
import LoadingPage from '~/pages/Modules/shared/LoadingPage'
import useProfile from '~/store/hooks/profile/use-profile'
import { TypeProfile } from '~/types/profile'
import useHookLayout from './use-hook'

type LayoutProps = {
    children: React.ReactNode
}

const LayoutMain = ({ children }: LayoutProps) => {
    useHookLayout()
    const { data: profile } = useProfile()
    const { hasButtonFloating } = useBtnFloating()

    const hasVet = profile?.type_profile === TypeProfile.VETERINARY

    return (
        <div className="relative">
            <Header />
            <div className="h-[48px] block w-full web:hidden" />
            <Drawer mode="VETERINARY" />
            <div
                className={cn(
                    'px-24 mobile:px-0 relative tablet:px-0 min-h-full',
                    'z-[1]',
                    // 'bg-cover bg-no-repeat bg-fixed',
                )}
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Suspense fallback={<LoadingPage />}>{children}</Suspense>
                <FieldDocumentAppointment
                    condition={hasButtonFloating && hasVet}
                    selectedTabInitial={0}
                />
            </div>
            {hasButtonFloating && <div className="w-full h-36 web:hidden " />}
        </div>
    )
}

LayoutMain.propTypes = {
    children: PropTypes.object,
}

export default LayoutMain
