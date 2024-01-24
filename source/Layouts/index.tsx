'use client'

import PlusIcon from '@heroicons/react/24/solid/PlusIcon'
import PropTypes from 'prop-types'
import type React from 'react'
import { useEffect, useState } from 'react'
import image from '../../styles/assets/images/landing/bg-pattern.png'

import cookies from '~/constants/cookies'

//import Components
import Footer from './Footer'
import Header from './Header'

//import actions
import {
    changeLayout,
    changeLayoutMode,
    changeLayoutPosition,
    changeLayoutWidth,
    changeSideBarSizeType,
    changeSideBarView,
    changeSidebarImageType,
    changeSidebarTheme,
    changeTopBarTheme,
} from '../store/slices/layouts/slice'

//redux
import cn from 'classnames'
import FieldDocumentAppointment from '~/Components/molecules/field-document-appointment'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { getCookie } from '~/utils/cookies-utils'

type LayoutProps = {
    children: React.ReactNode
}

const LayoutMain = ({ children }: LayoutProps) => {
    const dispatch = useAppDispatch()
    const {
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topBarThemeType,
        leftSideBarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
    } = useAppSelector((state) => state.Layout)

    useEffect(() => {
        const mode = getCookie(cookies.layoutMode.name)
        dispatch(changeLayoutMode(mode))
    }, [])

    /*
    layout settings
    */
    useEffect(() => {
        if (
            layoutType ||
            leftSidebarType ||
            layoutModeType ||
            layoutWidthType ||
            layoutPositionType ||
            topBarThemeType ||
            leftSideBarSizeType ||
            leftSidebarViewType ||
            leftSidebarImageType
        ) {
            dispatch(changeSideBarView(leftSidebarViewType))
            dispatch(changeSideBarSizeType(leftSideBarSizeType))
            dispatch(changeSidebarTheme(leftSidebarType))
            dispatch(changeLayoutMode(layoutModeType))
            dispatch(changeLayoutWidth(layoutWidthType))
            dispatch(changeLayoutPosition(layoutPositionType))
            dispatch(changeTopBarTheme(topBarThemeType))
            dispatch(changeLayout(layoutType))
            dispatch(changeSidebarImageType(leftSidebarImageType))
        }
    }, [
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topBarThemeType,
        leftSideBarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
        dispatch,
    ])

    const [headerClass, setHeaderClass] = useState('')
    // class add remove in header
    useEffect(() => {
        window.addEventListener('scroll', scrollNavigation, true)
    })

    function scrollNavigation() {
        const scrollUp = document.documentElement.scrollTop
        if (scrollUp > 50) {
            setHeaderClass('topBar-shadow')
        } else {
            setHeaderClass('')
        }
    }

    return (
        <div id="relative">
            <Header />
            {/* <Sidebar layoutType={layoutType} /> */}

            <div
                className={cn(
                    'px-24 mobile:px-0 relative',
                    'mobile:pt-20',
                    // 'bg-cover bg-no-repeat bg-fixed',
                )}
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {children}
                <FieldDocumentAppointment selectedTabInitial={0}>
                    {({ onChangeOpen }) => (
                        <div className="fixed mobile:flex mobile:flex-col items-center justify-center mobile:opacity-100 bottom-4 z-50 mobile:bottom-4 right-4  mobile:right-4 hidden ">
                            <button
                                type="button"
                                onClick={() => onChangeOpen(true)}
                                className="
                                bg-primary-600 p-3 rounded-full 
                                shadow-2xl 
                                transition duration-500 ease-in-out
                                opacity-40 hover:opacity-100 

                            "
                            >
                                <PlusIcon className="w-8 h-8 text-gray-50" />
                            </button>
                            <h6>Nova Consulta</h6>
                        </div>
                    )}
                </FieldDocumentAppointment>

                <Footer />
            </div>
        </div>
    )
}

LayoutMain.propTypes = {
    children: PropTypes.object,
}

export default LayoutMain
