/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { ButtonsNavBar } from '../nav-bar-landing'

const NavbarServiceTerms = () => {
    return (
        <header className="!bg-primary-500 shadow-2xl mobile:fixed mobile:z-50 w-full z-10 h-10 flex items-center">
            <div className="flex items-center justify-between w-full px-4">
                <Link href="/">
                    <img
                        src="/logo-rgb-04.png"
                        className="h-8 w-28 "
                        alt="logo light"
                    />
                </Link>

                <ButtonsNavBar />
            </div>
        </header>
    )
}

export default NavbarServiceTerms
