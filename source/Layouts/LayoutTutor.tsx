'use client'

import PropTypes from 'prop-types'
import type React from 'react'
import image from '../../styles/assets/images/landing/bg-pattern.png'

//import Components
import Header from './Header'

//import actions

//redux
import cn from 'classnames'
import { Suspense } from 'react'
import Drawer from '~/Components/organism/drawer'
import { useBtnFloating } from '~/contexts/button-floating'
import LoadingPage from '~/pages/Modules/shared/LoadingPage'
import useHookLayout from './use-hook'

type LayoutProps = {
    children: React.ReactNode
}

const LayoutTutor = ({ children }: LayoutProps) => {
    useHookLayout()
    const { hasButtonFloating } = useBtnFloating()

    return (
        <div id="relative">
            <Header drawer={(props) => <Drawer {...props} mode="TUTOR" />} />
            <div className="block h-4 web:hidden" />
            {/* <Sidebar layoutType={layoutType} /> */}

            <div
                className={cn(
                    'px-24 mobile:px-0 relative tablet:px-0 min-h-full pt-2',
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
            </div>
        </div>
    )
}

LayoutTutor.propTypes = {
    children: PropTypes.object,
}

export default LayoutTutor
