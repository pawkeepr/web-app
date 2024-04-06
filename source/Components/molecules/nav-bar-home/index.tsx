/* eslint-disable @next/next/no-img-element */
'use client'

import cn from 'classnames'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaStethoscope } from 'react-icons/fa'
import { MdPerson } from 'react-icons/md'
import { BtnLink } from '~/Components/atoms/btn'
import useResizeMobile from '~/hooks/use-resize-mobile'

export const ButtonsNavBar = () => {
    const { isMobile } = useResizeMobile()
    return (
        <div className="z-50 flex gap-2">
            <BtnLink
                message="Entre Tutor"
                className={cn(
                    'text-gray-500 hover:!bg-secondary-500 !border-secondary-500 border-0  w-fit ',
                    {
                        // 'border-2 border-solid w-40': !isMobile,
                        'border-0': isMobile,
                    },
                )}
                href="/tutor/sign-in"
            >
                <MdPerson className="w-6 h-6" />
            </BtnLink>
            <BtnLink
                message="Entre Vet"
                className={cn(
                    'border-primary-600 hover:!bg-secondary-500 border-0 w-40',
                    {
                        // 'border-2 border-solid w-40': !isMobile,
                        'border-0 ': isMobile,
                    },
                )}
                href="/veterinary/sign-in"
            >
                {/* icon de cadastro */}
                <FaStethoscope className="w-6 h-4" />
            </BtnLink>
        </div>
    )
}

const NavbarHome = () => {
    // const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [actionScroll, setActionScroll] = useState(false)

    // const toggle = () => setIsOpenMenu(!isOpenMenu);

    useEffect(() => {
        window.addEventListener('scroll', scrollNavigation, true)
    }, [])

    const scrollNavigation = () => {
        const scrollUp = document.documentElement.scrollTop

        if (scrollUp > 100) {
            setActionScroll(true)
        } else {
            setActionScroll(false)
        }
    }

    return (
        <header>
            <nav
                className="fixed z-50 left-0 right-0 mobile:p-2 px-4 py-2 transition-colors data-[scroll-action=true]:bg-white"
                data-scroll-action={actionScroll}
            >
                <div className="container flex flex-wrap justify-center gap-2 md:gap-0 md:justify-between">
                    <Link href="/">
                        <img
                            src="/logo-rgb-04.png"
                            className="hidden h-12 w-40  data-[logo-light=false]:flex"
                            data-logo-light={actionScroll}
                            alt="logo light"
                        />
                        <img
                            src="/logo-rgb-21.png"
                            className="hidden h-12 w-40 data-[logo-light=true]:flex"
                            data-logo-light={actionScroll}
                            alt="logo dark"
                        />
                    </Link>
                    <ButtonsNavBar />

                    {/* </Collapse> */}
                </div>
            </nav>
        </header>
    )
}

export default NavbarHome
