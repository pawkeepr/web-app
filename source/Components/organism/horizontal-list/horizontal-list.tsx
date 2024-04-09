/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Tab } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import { type VariantProps, tv } from 'tailwind-variants'

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
        w-full rounded-md h-14 web:h-10 mobile:rounded-none
        ring-white/60 ring-offset-2 focus:outline-none focus:ring-2
        leading-1 font-bold text-white 
        text-sm flex web:flex-row items-center justify-center
        mobile:flex-col mobile:text-xs gap-2
    `,
    // Ajustes adicionais para os estilos mobile
    variants: {
        selected: {
            true: 'bg-white !text-secondary-500 shadow',
            false: 'text-blue-100 hover:bg-white/[0.12]  hover:text-white',
        },
        disabled: {
            true: '!text-gray-600 cursor-not-allowed bg-transparent hover:bg-transparent hover:text-gray-600',
            false: 'text-blue-100 hover:bg-white/[0.12]  hover:text-white',
        },
    },
})

const tabList = tv({
    base: `
        bg-primary-500 p-0
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
}: HorizontalTabsProps) => {
    return (
        <Tab.Group as="section" className="flex flex-col w-full">
            <Tab.List
                className={tabList({
                    hidden: categories.length === 1,
                    bottomNavigation,
                    className: classNames.tabList,
                })}
            >
                {categories.map((category) => (
                    <Tab
                        key={category.id}
                        disabled={category.disabled}
                        className={({ selected }) =>
                            tab({
                                selected,
                                disabled: category.disabled,
                                className: classNames.tab,
                            })
                        }
                    >
                        {category.icon && <span>{category.icon}</span>}
                        {category.title}
                    </Tab>
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
