import Image from 'next/image'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { TbLogout } from 'react-icons/tb'

//import Components
import { useEffect, useRef, useState } from 'react'
import { changeHeaderSize } from '~/store/actions'
import { useAppDispatch } from '~/store/hooks'
import lightLogo from '../../public/logo-light.png'
import FullScreenDropdown from '../common/full-screen-dropdown'
import LightDark from '../common/light-dark'

import Bars3CenterLeftIcon from '@heroicons/react/24/solid/Bars3CenterLeftIcon'

import { BtnLink } from '~/Components/atoms/btn'
import { ProfileButton } from '~/Components/molecules/profile-dropdown/profile-dropdown'
import DrawerVet from '~/Components/organism/drawer'
import type { ModeDrawerItems } from '~/Components/organism/drawer/drawer'

type HeaderProps = {
    drawer?: (props: {
        closeDrawer: () => void
        visibleDrawer: boolean
        mode: ModeDrawerItems
    }) => JSX.Element
}

const Header = ({
    drawer: Drawer = (props) => <DrawerVet {...props} mode="VETERINARY" />,
}: HeaderProps) => {
    const [show, setShow] = useState<boolean>(false)

    const divRef = useRef<HTMLDivElement>(null)

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

    const handleShow = () => setShow(!show)
    const handleClose = () => setShow(false)

    return (
        <header
            className='!bg-primary-500 mobile:fixed mobile:z-50 w-full z-10 h-12 flex items-center'
            ref={divRef}
        >
            <div className="flex w-full justify-between items-center px-4">
                <button
                    onClick={handleShow}
                    type="button"
                    className="px-2 header-item topnav-hamburger"
                    id="topnav-hamburger-icon"
                >
                    <Bars3CenterLeftIcon className="h-6 w-6 text-white " />
                </button>

                <Drawer
                    closeDrawer={handleClose}
                    visibleDrawer={show}
                    mode="VETERINARY"
                />
                <div className="flex items-center justify-center">
                    <Link
                        href="/dashboard"
                        className="logo-light justify-center block absolute left-1/2 transform -translate-x-1/2"
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
                        className="hover:!text-secondary-500 mobile:hidden"
                    >
                        <div>
                            <TbLogout
                                className="w-6 text-cyan-50 h-6"
                                viewBox="0 0 24 24"
                            />
                            <span className="text-white text-xs font-medium">
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
