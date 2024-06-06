'use client'

import { FaStethoscope } from 'react-icons/fa'
import { MdPerson } from 'react-icons/md'
import Slide from 'react-reveal/Slide'
import Zoom from 'react-reveal/Zoom'
import { BtnLink } from '~/Components/atoms/btn'
import HeaderTitle from '~/Components/atoms/header-title'
import Footer from '~/Layouts/Footer'
import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import SignInPage from '~/pages/Modules/shared/Authentication/SignIn'

export const ButtonsNavBar = () => {
    return (
        <div className="flex items-center justify-center w-full gap-2">
            <BtnLink
                message="Entre Tutor"
                className="text-gray-500  !border-secondary-500 border-0 w-32 mobile:border-0"
                href="https://pawkeepr.app.br/tutor/sign-in"
            >
                <MdPerson className="w-6 h-6" />
            </BtnLink>
            <BtnLink
                message="Entre Vet"
                className="w-32 border-0 border-primary-600 mobile:border-0"
                href="https://pawkeepr.app.br/"
            >
                {/* icon de cadastro */}
                <FaStethoscope className="w-6 h-4" />
            </BtnLink>
        </div>
    )
}

const SignInPageNext = () => {
    return (
        <LayoutAuth>
            <SignInPage mode="tutor" bgImage="/bg-three.jpg" />
        </LayoutAuth>
    )
}

const HomePageNext = () => {
    return (
        <section className="min-h-screen section bg-primary-500" id="hero">
            <HeaderTitle title="" />
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
                                    Imagine realizar uma consulta completa de forma simples e intuitiva, sem que você precise perder tempo aprendendo sobre o aplicativo? 
                                    Com nosso aplicativo inovador, você terá acesso a recursos poderosos na palma da sua mão.
                                `}
                        </p>
                        <div className="flex items-center justify-center w-full gap-2">
                            <BtnLink
                                message="Cadastre-se Tutor"
                                className="w-32 border-0 border-primary-600 mobile:border-0"
                                href="https://pawkeepr.app.br/tutor/sign-up"
                            >
                                <MdPerson className="w-6 h-6" />
                            </BtnLink>
                        </div>
                    </div>
                </Zoom>
            </div>
            <div className="fixed inset-x-0 bottom-0">
                <Footer />
            </div>
        </section>
    )
}

export default SignInPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
