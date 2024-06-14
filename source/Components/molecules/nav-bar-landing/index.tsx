/* eslint-disable @next/next/no-img-element */
'use client'

import { UserPlusIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiLogIn } from 'react-icons/fi' // Ícone de Login
import { BtnLink } from '~/Components/atoms/btn'
import useModeProfile from '~/hooks/use-mode'
import { ModeProfile } from '~/types/profile'

export const ButtonsNavBar = () => {
    const { mode } = useModeProfile()
    const hrefSignIn =
        mode === ModeProfile.tutor ? '/tutor/sign-in' : '/veterinary/sign-in'
    const hrefSignUp = ModeProfile.vet ? '/tutor/sign-up' : '/veterinary/sign-up'

    return (
        <div className="z-50 flex gap-2">
            <BtnLink
                message="Criar Conta"
                className="border-0 border-primary-600"
                href={hrefSignUp}
            >
                <UserPlusIcon className="w-6 h-6" />
            </BtnLink>
            <BtnLink
                message="Entrar"
                className="text-gray-500 border-0"
                href={hrefSignIn}
            >
                <FiLogIn className="w-6 h-6" />
            </BtnLink>
        </div>
    )
}

const NavbarLanding = () => {
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
                className="fixed z-50 left-0 right-0 mobile:p-2 px-4 py-0 transition-colors data-[scroll-action=true]:bg-white shadow-md"
                data-scroll-action={actionScroll}
            >
                <div className="container flex flex-wrap justify-center gap-2 md:gap-0 md:justify-between">
                    <Link href="/">
                        <img
                            src="/logo-rgb-04.png"
                            className="hidden h-10 w-32  data-[logo-light=false]:flex"
                            data-logo-light={actionScroll}
                            alt="logo light"
                        />
                        <img
                            src="/logo-rgb-21.png"
                            className="hidden h-10 w-32 data-[logo-light=true]:flex"
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

export default NavbarLanding
