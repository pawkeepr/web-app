/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BtnLink } from '~/Components/atoms/btn'

import ArrowRightOnRectangleIcon from '@heroicons/react/24/solid/ArrowRightOnRectangleIcon'

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
                            height="40"
                            width={120}
                        />
                        <img
                            src="/logo-rgb-21.png"
                            className="hidden h-12 w-40 data-[logo-light=true]:flex"
                            data-logo-light={actionScroll}
                            alt="logo dark"
                        />
                    </Link>

                    {/* <NavbarToggler
                        className="navbar-toggler py-0 fs-20 text-body"
                        onClick={toggle}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="mdi mdi-menu"></i>
                    </NavbarToggler> */}

                    {/* <Collapse in={isOpenMenu} className="navbar-collapse"> */}

                    {/* <ScrollSpy
                                offset={0}
                                items={[
                                    "hero",
                                    "services",
                                    "features",
                                    "plans",
                                    "reviews",
                                    "team",
                                    "contact",
                                ]}
                                currentClassName="active"
                                className="navbar-nav mx-auto mt-2 mt-lg-0 items-center justify-center w-fit"
                                id="navbar-example"
                            >
                                <li className="nav-item">
                                    <a className="nav-link fs-15 fw-semibold text-secondary" href="#hero">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-15 fw-semibold text-light" href="#services">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-15 fw-semibold text-light" href="#features">Features</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-15 fw-semibold text-light" href="#plans">Plans</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-15 fw-semibold text-light" href="#reviews">Reviews</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-15 fw-semibold text-light" href="#team">Team</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-15 fw-semibold text-light" href="#contact">Contact</a>
                                </li>


                            </ScrollSpy> */}
                    <div className="z-50 flex gap-2">
                        <BtnLink
                            message="Entrar"
                            className="text-gray-500 hover:!bg-secondary-500 !border-secondary-500 border"
                            href="/sign-in"
                        >
                            <ArrowRightOnRectangleIcon />
                        </BtnLink>
                        <BtnLink
                            message="Criar Conta"
                            className="border-2 border-solid border-primary-600 hover:!bg-secondary-500"
                            href="/sign-up"
                        >
                            {/* icon de cadastro */}
                        </BtnLink>
                    </div>
                    {/* </Collapse> */}
                </div>
            </nav>
        </header>
    )
}

export default NavbarLanding
