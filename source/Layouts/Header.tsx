import Image from 'next/image'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { TbLogout } from 'react-icons/tb'

//import Components
import { useEffect, useRef } from 'react'
import { changeHeaderSize } from '~/store/actions'
import { useAppDispatch } from '~/store/hooks'
import lightLogo from '../../public/logo-light.png'
import FullScreenDropdown from '../common/full-screen-dropdown'
import LightDark from '../common/light-dark'

import Bars3CenterLeftIcon from '@heroicons/react/24/solid/Bars3CenterLeftIcon'

import { BtnLink } from '~/Components/atoms/btn'
import { ProfileButton } from '~/Components/molecules/profile-dropdown/profile-dropdown'
import useModal from '~/hooks/use-modal'

const Header = () => {
    const divRef = useRef<HTMLDivElement>(null)
    const { showModal } = useModal({ name: 'drawer' })
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (divRef?.current) {
            dispatch(
                changeHeaderSize({
                    width: divRef.current.offsetWidth,
                    height: divRef.current.offsetHeight,
                }),
            )
        }
    }, [dispatch])

    return (
        <header
            className="!bg-primary-500 mobile:fixed mobile:z-50 w-full z-10 h-12 flex items-center"
            ref={divRef}
        >
            <div className="flex w-full !z-50 justify-between items-center px-4">
                <button
                    onClick={() => showModal()}
                    type="button"
                    className="header-item topnav-hamburger"
                    id="topnav-hamburger-icon"
                >
                    <Bars3CenterLeftIcon className="w-6 h-6 text-white " />
                </button>
                <div className="flex items-center justify-center">
                    <Link
                        href="/dashboard"
                        className="absolute justify-center block transform -translate-x-1/2 logo-light left-1/2"
                    >
                        <Image
                            src={lightLogo}
                            alt="Logo Pawkeepr Mode Light"
                            height={120}
                            width={120}
                        />

                        {/* <Image
                            src={darkLogo}
                            alt="Logo Pawkeepr Mode Dark"
                            className="w-auto h-8"
                            height={120}
                            width={120}
                        />                             */}
                    </Link>
                </div>

                <div className="flex align-center">
                    {/* LanguageDropdown */}
                    {/* <LanguageDropdown /> */}

                    {/* WebAppsDropdown */}
                    {/* <WebAppsDropdown /> */}

                    {/* MyCartDropdwon */}
                    {/* <MyCartDropdown /> */}

                    <FullScreenDropdown />
                    <ProfileButton />
                    {/* Dark/Light Mode set */}
                    <LightDark />

                    {/* NotificationDropdown */}
                    {/* <NotificationDropdown /> */}
                    <BtnLink
                        href="/logout"
                        className="hover:!text-secondary-500 mobile:hidden w-fit"
                    >
                        <div>
                            <TbLogout
                                className="w-6 h-6 text-cyan-50"
                                viewBox="0 0 24 24"
                            />
                            <span className="text-xs font-medium text-white">
                                Sair
                            </span>
                        </div>
                    </BtnLink>
                </div>

                {/* <SearchOption /> */}
            </div>
        </header>
    )
}

export default Header
