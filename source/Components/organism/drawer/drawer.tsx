import ArrowLeftCircleIcon from '@heroicons/react/20/solid/ArrowLeftCircleIcon'
import HistoricIcon from '@heroicons/react/24/solid/ArchiveBoxXMarkIcon'
import DashboardIcon from '@heroicons/react/24/solid/HomeIcon'
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'
import Image from 'next/image'
import { layoutModeTypes } from '~/constants/layout'
import useChangeLayoutMode from '~/hooks/use-change-layout-mode'

import darkLogo from '../../../../public/logo-dark.png'
import lightLogo from '../../../../public/logo-light.png'

import { button } from '~/Components/atoms/btn'

import { UserCircleIcon } from '@heroicons/react/24/solid'
import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo, useMemo } from 'react'
import { FaComment } from 'react-icons/fa'
import Slide from 'react-reveal/Slide'
import { tv } from 'tailwind-variants'
import MyImage from '~/Components/atoms/my-image'
import useResizeMobile from '~/hooks/use-resize-mobile'
import useProfile from '~/store/hooks/profile/use-profile'

export const ModeDrawerItems = {
    VETERINARY: 'VETERINARY',
    TUTOR: 'TUTOR',
} as const
export type ModeDrawerItems = (typeof ModeDrawerItems)[keyof typeof ModeDrawerItems]

type DrawerProps = {
    closeDrawer: () => void
    visibleDrawer: boolean
    drawerWidth?: number
    mode: ModeDrawerItems
}
type Item = {
    name: string
    visible: boolean
    icon: React.ReactNode
    href: string
    disabled?: boolean
}

const veterinaryItems: Item[] = [
    {
        name: 'Inicio',
        visible: true,
        icon: <DashboardIcon className="w-5 h-5" />,
        href: '/dashboard',
    },
    {
        name: 'Perfil',
        visible: true,
        disabled: false,
        icon: <UserCircleIcon className="w-5 h-5" />,
        href: '/profile',
    },
    {
        name: 'Histórico',
        visible: true,
        icon: <HistoricIcon className="w-5 h-5" />,
        href: '/dashboard/historic',
    },
]

const tutorsItems: Item[] = [
    {
        name: 'Início',
        visible: true,
        icon: <DashboardIcon className="w-5 h-5" />,
        href: '/tutor/dashboard',
    },
    {
        name: 'Perfil',
        visible: false,
        disabled: true,
        icon: <UserCircleIcon className="w-5 h-5" />,
        href: '/tutor/profile',
    },
    {
        name: 'Histórico',
        visible: true,
        icon: <HistoricIcon className="w-5 h-5" />,
        href: '/tutor/dashboard/historic',
    },
]

const drawerBtn = {
    container: tv({
        base: `
            ${button({ link: true })} 
            flex justify-start items-center
            px-4 py-2 w-full my-2 font-sans 
            text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-600
            hover:bg-gray-200 dark:hover:bg-dark-600 rounded-none
        `,
        variants: {
            disabled: {
                true: `
                    !text-gray-400 hover:text-gray-400
                    hover:bg-transparent hover:cursor-default
                `,
            },
            selected: {
                true: `
                    bg-gray-200 dark:bg-dark-600
                    text-gray-700 dark:text-gray-100
                    hover:bg-gray-100 dark:hover:bg-dark-600
                `,
            },
        },
    }),
    title: tv({
        base: `
            font-semibold mx-4
        `,
    }),
}

const strategies = new Map<ModeDrawerItems, Item[]>([
    [ModeDrawerItems.VETERINARY, veterinaryItems],
    [ModeDrawerItems.TUTOR, tutorsItems],
])

const Drawer = ({
    closeDrawer,
    visibleDrawer,
    mode: drawerItems = 'VETERINARY',
}: DrawerProps) => {
    const items = strategies.get(drawerItems) || []
    const pathname = usePathname()
    const { mode } = useChangeLayoutMode()
    const isLightMode = mode === layoutModeTypes.LIGHT_MODE
    const { isMobile } = useResizeMobile()
    const { data: profile } = useProfile()

    const options = useMemo(
        () =>
            items.filter((item) => {
                return isMobile || item.visible
            }),
        [isMobile],
    )

    return (
        <>
            {visibleDrawer && (
                <Slide left>
                    <div
                        className={cn(
                            `
                            top-0 bottom-0 left-0 fixed
                            !transition-all !duration-500 !ease-out
                            z-[20] flex flex-col
                            mobile:!z-50
                            h-full  
                            py-8 border-gray-200 dark:border-dark-600
                            w-72
                            overflow-y-auto bg-white dark:!bg-dark-500
                            overflow-x-hidden
                        `,
                        )}
                    >
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
                                onClick={closeDrawer}
                                className="w-8 h-8 cursor-pointer hover:text-gray-500 dark:hover:text-gray-400"
                            />
                        </div>

                        <div className="flex flex-col items-center mt-6 -mx-2">
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

                        <div className="flex flex-col justify-between flex-1 mt-6">
                            <nav className="gap-1">
                                {options.map((item, index) => (
                                    <Link
                                        key={index.toString()}
                                        className={drawerBtn.container({
                                            disabled: item.disabled,
                                            selected: pathname === item.href,
                                        })}
                                        href={item.disabled ? '#' : item.href}
                                    >
                                        {item.icon}

                                        <span className={drawerBtn.title()}>
                                            {item.name}
                                        </span>
                                    </Link>
                                ))}
                                <div className="absolute bottom-0 w-full mb-2">
                                    <Link
                                        className={drawerBtn.container()}
                                        href="/feedback"
                                    >
                                        <FaComment className="w-5 h-5 mt-1" />
                                        <span className={drawerBtn.title()}>
                                            Ajude-nos a melhorar
                                        </span>
                                    </Link>
                                    <Link
                                        className={drawerBtn.container()}
                                        href="/logout"
                                    >
                                        <ArrowLeftCircleIcon className="w-5 h-5 mt-1" />
                                        <span className={drawerBtn.title()}>
                                            Sair
                                        </span>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </Slide>
            )}
        </>
    )
}

export default memo(Drawer)
