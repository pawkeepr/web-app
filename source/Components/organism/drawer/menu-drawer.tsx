import ArrowLeftCircleIcon from '@heroicons/react/20/solid/ArrowLeftCircleIcon'
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { FaComment } from 'react-icons/fa'
import MyImage from '~/Components/atoms/my-image'
import withControl from '~/Components/helpers/with-control'
import { layoutModeTypes } from '~/constants/layout'
import useChangeLayoutMode from '~/hooks/use-change-layout-mode'
import useModal from '~/hooks/use-modal'
import useResizeMobile from '~/hooks/use-resize-mobile'
import darkLogo from '~/logo-dark.png'
import lightLogo from '~/logo-light.png'
import useProfile from '~/store/hooks/profile/use-profile'
import { drawerBtn, strategies, type DrawerProps } from './drawer-utils'

const MenuDrawer = ({
    // visibleDrawer,
    mode: drawerItems = 'VETERINARY',
}: DrawerProps) => {
    const pathname = usePathname()
    const { mode } = useChangeLayoutMode()
    const isLightMode = mode === layoutModeTypes.LIGHT_MODE
    const { data: profile } = useProfile()
    const { closeModal, open } = useModal({ name: 'drawer' })
    const { isMobile } = useResizeMobile()
    const items = strategies.get(drawerItems) || []

    const options = useMemo(
        () =>
            items.filter((item) => {
                return isMobile || item.visible
            }),
        [isMobile],
    )
    return (
        <>
            <div className="flex justify-between px-4">
                <Link href="/">
                    <Image
                        src={isLightMode ? lightLogo : darkLogo}
                        alt="Logo Pawkeepr Mode Light"
                        className="w-auto h-8"
                        height={120}
                        width={120}
                    />
                </Link>
                <XMarkIcon
                    className="w-8 h-8 cursor-pointer hover:text-gray-500 dark:hover:text-gray-400"
                    onClick={closeModal}
                />
            </div>
            <div className="flex flex-col items-center w-full mt-6 -mx-2">
                <div className="flex items-center self-center justify-center flex-1">
                    <MyImage
                        className="self-center w-40 h-40 text-gray-400 rounded-full"
                        src={profile?.user_information?.url_img || ''}
                        alt="Header Avatar"
                    />
                </div>
                <h6 className="p-1 m-1 font-sans font-semibold text-center text-md">
                    Bem Vindo, {profile?.user_information?.first_name}!
                </h6>
            </div>

            <div className="flex flex-col justify-between flex-1 w-full mt-6">
                <nav className="w-full gap-1">
                    {options.map((item, index) => (
                        <Link
                            key={index.toString()}
                            className={drawerBtn.container({
                                disabled: item.disabled || !open,
                                selected: pathname === item.href,
                            })}
                            href={item.disabled || !open ? '#' : item.href}
                        >
                            {item.icon}

                            <span className={drawerBtn.title()}>{item.name}</span>
                        </Link>
                    ))}
                    <div className="absolute bottom-0 w-full mb-2 ">
                        <Link
                            className={drawerBtn.container({
                                disabled: !open,
                            })}
                            href="/feedback"
                        >
                            <FaComment className="w-5 h-5 mt-1" />
                            <span className={drawerBtn.title()}>
                                Ajude-nos a melhorar
                            </span>
                        </Link>
                        <Link
                            className={drawerBtn.container({
                                disabled: !open,
                            })}
                            href="/logout"
                        >
                            <ArrowLeftCircleIcon className="w-5 h-5 mt-1" />
                            <span className={drawerBtn.title()}>Sair</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default withControl(MenuDrawer)
