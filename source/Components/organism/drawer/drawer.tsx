/* eslint-disable @next/next/no-img-element */
import ArrowLeftCircleIcon from '@heroicons/react/20/solid/ArrowLeftCircleIcon'
import Cog8ToothIcon from '@heroicons/react/24/solid/Cog8ToothIcon'
import DashboardIcon from '@heroicons/react/24/solid/HomeIcon'
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'
import Image from 'next/image'
import { MdPerson, MdPets } from 'react-icons/md'
import { layoutModeTypes } from '~/Components/constants/layout'
import useChangeLayoutMode from '~/hooks/use-change-layout-mode'

import darkLogo from '../../../../public/logo-dark.png'
import lightLogo from '../../../../public/logo-light.png'

import { button } from '~/Components/atoms/btn'

import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

type DrawerProps = {
    closeDrawer: () => void
    visibleDrawer: boolean
    drawerWidth?: number
}

const items = [
    {
        name: 'Consultas',
        icon: <DashboardIcon className="w-5 h-5" />,
        href: '/dashboard',
    },
    {
        name: 'Pets',
        icon: <MdPets className="w-5 h-5" />,
        href: '/dashboard/pets',
    },
    {
        name: 'Tutores',
        icon: <MdPerson className="w-5 h-5" />,
        href: '/dashboard/tutors',
    },
    {
        name: 'Configurações',
        icon: <Cog8ToothIcon className="w-5 h-5" />,
        href: '#',
    },
]

const Drawer = ({ closeDrawer, visibleDrawer }: DrawerProps) => {
    const pathname = usePathname()
    const { mode } = useChangeLayoutMode()
    const isLightMode = mode === layoutModeTypes.LIGHT_MODE

    const buttonStyled = twMerge(
        button({ link: true }),
        'flex justify-start items-center',
        'px-4 py-2 w-full mt-4',
        'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-600',
        'hover:bg-gray-200 dark:hover:bg-dark-600 rounded-none',
    )

    return (
        <div
            className={cn(
                `
                top-0 bottom-0 left-0 fixed
                transition-all duration-500 ease-out
                z-[20] flex flex-col
                mobile:!z-50
                h-full  
                py-8 border-r-2 border-gray-200 dark:border-dark-600
                w-72
                overflow-y-auto bg-white dark:!bg-dark-500
                overflow-x-hidden
            `,
                {
                    '-translate-x-full': !visibleDrawer,
                    'translate-x-0': visibleDrawer,
                },
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
                    className="cursor-pointer w-8 h-8 hover:text-gray-500 dark:hover:text-gray-400"
                />
            </div>

            <div className="flex flex-col items-center mt-6 -mx-2">
                <h4 className="mx-2 mt-4 font-semibold">Olá Veterinário(a)</h4>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="gap-1">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            className={cn(buttonStyled, {
                                'bg-gray-200 dark:bg-dark-600':
                                    pathname === item.href,
                            })}
                            href={item.href}
                        >
                            {item.icon}

                            <span className="mx-4 font-medium">{item.name}</span>
                        </Link>
                    ))}
                    <div className="absolute w-full bottom-0">
                        <Link className={buttonStyled} href="/logout">
                            <ArrowLeftCircleIcon
                                className="w-5 h-5 mt-1"
                                viewBox="0 0 24 24"
                            />
                            <span className="mx-4 font-medium">Sair</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Drawer
