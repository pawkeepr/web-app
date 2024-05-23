/* eslint-disable @next/next/no-img-element */
'use client'

import cn from 'classnames'
import { BtnLink } from '~/Components/atoms/btn'
import useResizeMobile from '~/hooks/use-resize-mobile'

import { FaStethoscope } from 'react-icons/fa'
import { MdPerson } from 'react-icons/md'
import Slide from 'react-reveal/Slide'
import Zoom from 'react-reveal/Zoom'
import HeaderTitle from '~/Components/atoms/header-title'
import NavbarHome from '~/Components/molecules/nav-bar-home'
import Footer from '~/Layouts/Footer'

export const ButtonsNavBar = () => {
    const { isMobile } = useResizeMobile()
    return (
        <div className="flex items-center justify-center w-full gap-2">
            <BtnLink
                message="Saiba + Tutor"
                className={cn(
                    'text-gray-500 hover:!bg-secondary-500 !border-secondary-500 border-0  w-32 ',
                    {
                        // 'border-2 border-solid w-40': !isMobile,
                        'border-0': isMobile,
                    },
                )}
                href="/tutor/landing-page"
            >
                <MdPerson className="w-6 h-6" />
            </BtnLink>
            <BtnLink
                message="Saiba + Vet"
                className={cn(
                    'border-primary-600 hover:!bg-secondary-500 border-0 w-32',
                    {
                        // 'border-2 border-solid w-40': !isMobile,
                        'border-0 ': isMobile,
                    },
                )}
                href="/veterinary/landing-page"
            >
                {/* icon de cadastro */}
                <FaStethoscope className="w-6 h-4" />
            </BtnLink>
        </div>
    )
}

const HomePage = () => {
    return (
        <>
            <NavbarHome />
            <section className="min-h-screen section bg-primary-500" id="hero">
                <HeaderTitle title="Bem Vindo" />
                <div className="bg-overlay bg-overlay-pattern" />

                <div className="grid grid-cols-1 p-4 mt-5 web:grid-cols-2">
                    <Slide left>
                        <div className="col-span-1">
                            <img
                                src="/landing-page-01.jpg"
                                className="w-100"
                                alt="Landing Page"
                            />
                        </div>
                    </Slide>
                    <Zoom>
                        <div className="col-span-1 pt-5 text-center mt-lg-5">
                            <p className="p-4 font-sans text-lg font-semibold text-white lg:text-2xl">
                                {`
                                    Imagine realizar uma consulta completa em no máximo 5 minutos, 
                                    sem sacrificar a qualidade do atendimento. 
                                    Com nosso aplicativo inovador, você terá acesso a recursos poderosos 
                                    na palma da sua mão.
                                `}
                            </p>
                        </div>
                    </Zoom>
                </div>
                <div className="fixed inset-x-0 bottom-0">
                    <Footer />
                </div>
            </section>
        </>
    )
}

export default HomePage
