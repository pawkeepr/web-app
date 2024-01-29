/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { ButtonsNavBar } from '../nav-bar-landing'

const NavbarServiceTerms = () => {
    return (
        <header>
            <nav className="fixed z-50 left-0 right-0 mobile:p-2 px-4 py-2 transition-colors bg-primary shadow-md">
                <div className="container flex flex-wrap justify-center gap-2 web:gap-0 web:justify-between">
                    <Link href="/">
                        <img
                            src="/logo-rgb-04.png"
                            className=" h-12 w-40"
                            alt="logo light"
                        />
                    </Link>

                    <ButtonsNavBar />
                    {/* </Collapse> */}
                </div>
            </nav>
        </header>
    )
}

export default NavbarServiceTerms
