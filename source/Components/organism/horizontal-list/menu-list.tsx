/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Tab, TabList } from '@headlessui/react'
import { tv, type VariantProps } from 'tailwind-variants'

export type TabItem = {
    id: number | string
    title: string
    icon?: React.ReactNode
    href: string
    disabled?: boolean
    tab: React.ReactNode
}

const tab = tv({
    // Ajuste os estilos base e variantes conforme necessário
    base: `
        rounded-none 
        focus:outline-none focus:ring-none
        leading-1 font-bold text-gray-400 bg-transparent
        text-sm flex web:flex-row items-center justify-center
        gap-1 flex-grow
        transition-transform duration-300 ease-in-out
    `,
    // Ajustes adicionais para os estilos mobile
    variants: {
        mobile: {
            true: 'mobile:flex-col mobile:text-xs mobile:h-20 mobile:!max-w-[80px] ',
        },
        web: {
            true: 'web:py-2 web:!w-full',
        },
        selected: {
            true: 'text-primary-500 transform scale-105',
        },
        disabled: {
            true: '!text-gray-200 cursor-not-allowed bg-transparent hover:bg-transparent hover:text-gray-600',
        },
        menu: {
            true: 'mobile:mb-0',
        },
        mode: {
            simple: 'mobile:bg-white',
            default: 'mobile:bg-primary-500',
        },
    },
    defaultVariants: {
        mobile: true,
        web: true,
        mode: 'default',
    },
    compoundVariants: [
        {
            selected: true,
            menu: true,
            className: 'mobile:!rounded-full mobile:shadow-theme-1 bg-primary-500 ',
        },
        {
            selected: true,
            mode: 'default',
            className: 'text-white mobile:translate-y-[-30%]',
        },
        {
            selected: true,
            mobile: true,
            mode: 'default',
            className: '',
        },
    ],
})

const tabList = tv({
    base: `
        p-0 
        mobile:overflow-visible 
        web:bg-white
        web:rounded-lg mobile:h-10 shadow-theme-3 web:overflow-hidden
    `,
    variants: {
        hidden: {
            true: 'hidden',
            false: 'flex flex-row',
        },
        bottomNavigation: {
            true: 'mobile:fixed mobile:bottom-0 mobile:left-0 mobile:right-0 mobile:z-10 mobile:shadow-theme-1',
        },
        mobile: {
            true: 'mobile:rounded-t-full  mobile:h-14 mobile:!overflow-visible',
        },
        mode: {
            simple: 'mobile:bg-white ',
            default: 'mobile:bg-[#f6dda3]',
        },
    },
    defaultVariants: {
        mode: 'default',
    },
})

export type TabListProps = VariantProps<typeof tabList>
export type TabProps = VariantProps<typeof tab>

type MenuListProps = {
    categories: TabItem[]
    children?: React.ReactNode
    classNames?: {
        tabList?: string
        tab?: string
        panel?: string
    }
} & TabListProps &
    TabProps

const MenuList = ({
    categories,
    bottomNavigation,
    classNames = {},
    menu = false,
    mobile = true,
    mode = 'default',
}: MenuListProps) => {
    return (
        <TabList
            className={tabList({
                hidden: categories.length === 1,
                bottomNavigation,
                className: classNames?.tabList,
                mobile,
                mode,
            })}
        >
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="flex items-center justify-center flex-grow w-1/3 h-full transition-transform bg-transparent"
                >
                    <Tab
                        key={category.id}
                        disabled={category.disabled}
                        className={({ selected }) =>
                            tab({
                                selected,
                                menu,
                                disabled: category.disabled,
                                className: classNames.tab,
                                mode,
                            })
                        }
                    >
                        {category.icon && <span>{category.icon}</span>}
                        {category.title && <span>{category.title}</span>}
                    </Tab>
                </div>
            ))}
        </TabList>
    )
}

export default MenuList
