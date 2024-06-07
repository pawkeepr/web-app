/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Tab } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
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
        leading-1 font-bold text-gray-500 bg-transparent
        text-sm flex web:flex-row items-center justify-center
        gap-1 flex-grow  
        transition-transform duration-300 ease-in-out
    `,
    // Ajustes adicionais para os estilos mobile
    variants: {
        mobile: {
            true: 'mobile:flex-col mobile:text-xs mobile:h-20 mobile:!max-w-[80px]',
        },
        web: {
            true: 'web:py-2 web:!w-full',
        },
        selected: {
            true: '!text-white !shadow-2xl transform scale-105 mobile:translate-y-[-20%]',
        },
        disabled: {
            true: '!text-gray-600 cursor-not-allowed bg-transparent hover:bg-transparent hover:text-gray-600',
        },
        menu: {
            true: 'mobile:mb-0',
        },
    },
    defaultVariants: {
        mobile: true,
        web: true,
    },
    compoundVariants: [
        {
            selected: true,
            menu: true,
            className: 'mobile:!rounded-full bg-primary-500',
        },
    ],
})

const tabList = tv({
    base: `
        p-0 
        mobile:bg-[#f6dda3] 
        mobile:rounded-t-full mobile:h-16 mobile:overflow-visible 
        web:bg-white !shadow-2xl
        web:rounded-md
    `,
    variants: {
        hidden: {
            true: 'hidden',
            false: 'flex flex-row',
        },
        bottomNavigation: {
            true: 'mobile:fixed mobile:bottom-0 mobile:left-0 mobile:right-0 mobile:z-10',
            false: '',
        },
    },
})

type TabListProps = VariantProps<typeof tabList>
type TabProps = VariantProps<typeof tab>

type HorizontalTabsProps = {
    categories: TabItem[]
    children?: React.ReactNode
    classNames?: {
        tabList?: string
        tab?: string
        panel?: string
    }
} & TabListProps &
    TabProps

const HorizontalTabs = ({
    categories,
    bottomNavigation = true,
    children = null,
    classNames = {},
    menu = false,
}: HorizontalTabsProps) => {
    return (
        <Tab.Group as="section" className="flex flex-col w-full ">
            <Tab.List
                className={tabList({
                    hidden: categories.length === 1,
                    bottomNavigation,
                    className: classNames.tabList,
                })}
            >
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="flex items-center justify-center flex-grow w-1/3"
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
                                })
                            }
                        >
                            {category.icon && <span>{category.icon}</span>}
                            {category.title}
                        </Tab>
                    </div>
                ))}
            </Tab.List>
            <Tab.Panels
                className=" 
                    relative w-full web:px-2 mobile:px-0
                    mobile:items-center mobile:flex mobile:!h-fit mobile:flex-col mobile:w-full
                    tablet:py-0 tablet:items-center tablet:flex tablet:!h-fit tablet:flex-col
                "
            >
                {children}
                {categories.map((item) => (
                    <Tab.Panel
                        key={item.id}
                        className={twMerge('w-full p-0', classNames.panel)}
                    >
                        {item.tab}
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    )
}

export default HorizontalTabs
