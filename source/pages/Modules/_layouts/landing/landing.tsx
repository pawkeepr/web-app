'use client'

import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon'
import React, { useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import HeaderTitle from '~/Components/atoms/header-title'
import NavbarLanding from '~/Components/molecules/nav-bar-landing'
import Footer from '~/Layouts/Footer'

// https://api.whatsapp.com/send/?phone=5511934463021&text&type=phone_number&app_absent=0

type LandingLayoutProps = {
    children: React.ReactNode
    title?: string
    navBar?: () => JSX.Element
}

const LandingLayout = ({
    children,
    navBar: NabBar = NavbarLanding,
    title,
}: LandingLayoutProps) => {
    useEffect(() => {
        window.onscroll = () => {
            scrollFunction()
        }
    }, [])

    const scrollFunction = () => {
        const element = document.getElementById('back-to-top')
        if (element) {
            if (
                document.body.scrollTop > 100 ||
                document.documentElement.scrollTop > 100
            ) {
                element.style.display = 'block'
            } else {
                element.style.display = 'none'
            }
        }
    }

    const toTop = () => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }

    const openWhatsapp = () => {
        const url =
            'https://api.whatsapp.com/send/?phone=5579981617352&text&type=phone_number&app_absent=0'
        window.open(url, '_blank')
    }

    return (
        <React.Fragment>
            <HeaderTitle title={title || ''} />
            <div className="layout-wrapper landing !bg-primary-500 min-h-screen">
                <NabBar />
                {children}
                {/* <WorkProcess /> */}
                {/* <Plans /> */}
                {/* <Reviews />
                <Teams />
                <FAQ />
                <Contact /> */}
                <Footer bg="primary" />
            </div>
            <button
                type="button"
                onClick={() => toTop()}
                className="bg-secondary-500 p-3 rounded-full absolute bottom-0 right-0 mb-[5rem] shadow-md"
                id="back-to-top"
            >
                <ArrowUpIcon className="w-6 h-6" />
            </button>
            <div className="fixed bottom-0 left-0 m-4">
                <button
                    type="button"
                    onClick={openWhatsapp}
                    className={`bg-primary-500 p-3 rounded-full 
                    shadow-md
                    opacity-50 hover:!opacity-100 z-100 flex items-center`}
                    id="whatsapp"
                >
                    <FaWhatsapp className="w-6 h-6 text-white" />
                </button>
            </div>
        </React.Fragment>
    )
}

export default LandingLayout
