import { UserCircleIcon } from '@heroicons/react/24/solid'
import HistoricIcon from '@heroicons/react/24/solid/ArchiveBoxXMarkIcon'
import DashboardIcon from '@heroicons/react/24/solid/HomeIcon'
import { GiHealthNormal } from 'react-icons/gi'
import { tv } from 'tailwind-variants'
import { button } from '~/Components/atoms/btn'

export const ModeDrawerItems = {
    VETERINARY: 'VETERINARY',
    TUTOR: 'TUTOR',
} as const
export type ModeDrawerItems = (typeof ModeDrawerItems)[keyof typeof ModeDrawerItems]

export type DrawerProps = {
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
        href: '/v/dashboard',
    },
    {
        name: 'Perfil',
        visible: true,
        disabled: false,
        icon: <UserCircleIcon className="w-5 h-5" />,
        href: '/v/profile',
    },
    {
        name: 'Histórico',
        visible: true,
        icon: <HistoricIcon className="w-5 h-5" />,
        href: '/v/dashboard/historic',
    },
]
const tutorsItems: Item[] = [
    {
        name: 'Início',
        visible: true,
        icon: <DashboardIcon className="w-5 h-5" />,
        href: '/t/dashboard',
    },
    {
        name: 'Perfil',
        visible: true,
        disabled: false,
        icon: <UserCircleIcon className="w-5 h-5" />,
        href: '/t/profile',
    },
    // {
    //     name: 'PetMaps',
    //     visible: true,
    //     icon: <FaMapSigns className="w-5 h-5" />,
    //     href: '/t/pet/maps',
    // },
    {
        name: 'Planos de Saúde',
        visible: true,
        icon: <GiHealthNormal className="w-5 h-5" />,
        href: '/t/pet/health-plans',
    },
    {
        name: 'Histórico',
        visible: true,
        icon: <HistoricIcon className="w-5 h-5" />,
        href: '/t/dashboard/historic',
    },
]

export const drawerBtn = {
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

export const strategies = new Map<ModeDrawerItems, Item[]>([
    [ModeDrawerItems.VETERINARY, veterinaryItems],
    [ModeDrawerItems.TUTOR, tutorsItems],
])
