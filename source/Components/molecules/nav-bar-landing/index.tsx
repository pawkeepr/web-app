/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa' // Ícone de Cadastro
import { FiLogIn } from 'react-icons/fi' // Ícone de Login
import { BtnLink } from '~/Components/atoms/btn'

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
                className="fixed z-50 left-0 right-0 mobile:p-2 px-4 py-2 transition-colors data-[scroll-action=true]:bg-white shadow-md"
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

                    <div className="z-50 flex gap-2">
                        <BtnLink
                            message="Entrar"
                            className="text-gray-500 hover:!bg-secondary-500 !border-secondary-500 border w-40"
                            href="/sign-in"
                        >
                            <FiLogIn className="w-8 h-8" />
                        </BtnLink>
                        <BtnLink
                            message="Criar Conta"
                            className="border-2 border-solid border-primary-600 hover:!bg-secondary-500 w-40"
                            href="/sign-up"
                        >
                            {/* icon de cadastro */}
                            <FaRegEdit />
                        </BtnLink>
                    </div>
                    {/* </Collapse> */}
                </div>
            </nav>
        </header>
    )
}

export default NavbarLanding
