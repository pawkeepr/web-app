import ArrowLeftCircleIcon from '@heroicons/react/20/solid/ArrowLeftCircleIcon'
import HistoricIcon from '@heroicons/react/24/solid/ArchiveBoxXMarkIcon'
import DashboardIcon from '@heroicons/react/24/solid/HomeIcon'
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'
import Image from 'next/image'
import Drawer from 'react-modern-drawer'
import { layoutModeTypes } from '~/constants/layout'

import darkLogo from '../../../../public/logo-dark.png'
import lightLogo from '../../../../public/logo-light.png'

import { button } from '~/Components/atoms/btn'

import { useSpring, animated } from '@react-spring/web'
import { useDrag, useGesture } from '@use-gesture/react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FaComment } from 'react-icons/fa'
import { tv } from 'tailwind-variants'
import MyImage from '~/Components/atoms/my-image'
import useChangeLayoutMode from '~/hooks/use-change-layout-mode'
import useModal from '~/hooks/use-modal'
import useResizeMobile from '~/hooks/use-resize-mobile'
import useProfile from '~/store/hooks/profile/use-profile'
import { set } from 'lodash'

export const ModeDrawerItems = {
    VETERINARY: 'VETERINARY',
    TUTOR: 'TUTOR',
} as const
export type ModeDrawerItems = (typeof ModeDrawerItems)[keyof typeof ModeDrawerItems]

type DrawerProps = {
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
        href: '/veterinary/dashboard',
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
        href: '/veterinary/dashboard/historic',
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
        visible: true,
        disabled: false,
        icon: <UserCircleIcon className="w-5 h-5" />,
        href: '/profile',
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
            pl-4
            py-2 w-full my-2 font-sans 
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


const CustomDrawer = ({
    // visibleDrawer,
    mode: drawerItems = 'VETERINARY',
}: DrawerProps) => {
    const items = strategies.get(drawerItems) || []
    const pathname = usePathname()
    const { mode } = useChangeLayoutMode()
    const isLightMode = mode === layoutModeTypes.LIGHT_MODE
    const { isMobile } = useResizeMobile()
    const { data: profile } = useProfile()
    const { showModal, closeModal, open } = useModal({ name: 'drawer' })
    const options = useMemo(
        () =>
            items.filter((item) => {
                return isMobile || item.visible
            }),
        [isMobile],
    )


    //  const [{ x, y }, api] = useSpring(() => ({ x: 245, y: 0 }))
    //  const bind = useDrag(({ down, offset: [ox, oy] }) => api.start({ x: ox, y: oy, immediate: down }), {
    //      bounds: { left: 0, right: 240, top: -50, bottom: 50 }
    //    })

    //  const closeModal2 = () => {
    //      api.start({ x: 5 } );
    //      closeModal();
    //  };

    //  const openModal = () => {
    //      api.start({ x:  245} );
    //      showModal();
    //  };

      const bind = useGesture({
          onDrag: ({down, movement: [mx]}) => {
             if (down && mx > 100) {
                 showModal();
         }
     }
     })


    return (
        <Drawer open={open} onClose={closeModal} direction="left">
            <div {...bind()}
                className={cn(
                    `
                        flex flex-col
                        h-full py-8 border-gray-200 dark:border-dark-600
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
                        <div className="absolute bottom-0 w-full mb-2 ">
                            <Link
                                className={drawerBtn.container()}
                                href="/feedback"
                            >
                                <FaComment className="w-5 h-5 mt-1" />
                                <span className={drawerBtn.title()}>
                                    Ajude-nos a melhorar
                                </span>
                            </Link>
                            <Link className={drawerBtn.container()} href="/logout">
                                <ArrowLeftCircleIcon className="w-5 h-5 mt-1" />
                                <span className={drawerBtn.title()}>Sair</span>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </Drawer>
    )
}

export default CustomDrawer
