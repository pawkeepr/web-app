'use client'

import PropTypes from 'prop-types'
import type React from 'react'
import image from '../../styles/assets/images/landing/bg-pattern.png'

//import Components
import Header from './Header'

//import actions

import cn from 'classnames'
import FieldDocumentAppointment from '~/Components/molecules/field-appointment-vet'
import { useBtnFloating } from '~/contexts/button-floating'
import useHookLayout from './use-hook'

type LayoutProps = {
    children: React.ReactNode
}

const LayoutMain = ({ children }: LayoutProps) => {
    useHookLayout()
    const { hasButtonFloating } = useBtnFloating()
    return (
        <div className="relative">
            <Header />
            <div className="h-4 block w-full web:hidden" />
            {/* <Sidebar layoutType={layoutType} /> */}

            <div
                className={cn(
                    'px-24 mobile:px-0 relative tablet:px-0 min-h-full',
                    'mobile:pt-[40px] z-[1]',
                    // 'bg-cover bg-no-repeat bg-fixed',
                )}
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {children}
                <FieldDocumentAppointment
                    condition={hasButtonFloating}
                    selectedTabInitial={0}
                />
            </div>
            <div className="h-40 block w-full " />
        </div>
    )
}

LayoutMain.propTypes = {
    children: PropTypes.object,
}

export default LayoutMain
