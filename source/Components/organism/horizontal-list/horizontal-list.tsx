/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Tab } from '@headlessui/react'
import cn from 'classnames'
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
        w-full rounded-sm py-2.5 
        ring-white/60 ring-offset-2 focus:outline-none focus:ring-2
        leading-1 font-bold text-white
        mobile:text-xs
        text-sm flex web:flex-row items-center justify-center
        mobile:flex-col
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
        gap-2 p-1 bg-primary-500
        web:rounded-sm web:mt-2 
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
} & TabListProps &
    TabProps

const HorizontalTabs = ({
    categories,
    bottomNavigation = true,
}: HorizontalTabsProps) => {
    return (
        <Tab.Group as="section" className="flex flex-col w-full">
            <Tab.List
                className={tabList({
                    hidden: categories.length === 1,
                    bottomNavigation,
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
                            })
                        }
                    >
                        {category.icon && <span>{category.icon}</span>}
                        {category.title}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
                {categories.map((item) => (
                    <Tab.Panel
                        key={item.id}
                        className={cn(
                            'rounded-xl bg-white p-3',
                            'ring-white/60 ring-offset-2 focus:outline-none focus:ring-2',
                        )}
                    >
                        {item.tab}
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    )
}

export default HorizontalTabs
