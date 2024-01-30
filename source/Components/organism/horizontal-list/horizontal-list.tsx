/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { tv } from 'tailwind-variants'

type HorizontalTabsProps = {
    categories: {
        id: number
        title: string
        icon?: React.ReactNode
        href: string
        disabled?: boolean
        tab: React.ReactNode
    }[]
}

const tab = tv({
    // Ajuste os estilos base e variantes conforme necessário
    base: `
        w-full rounded-sm py-2.5 
        ring-white/60 ring-offset-2 focus:outline-none focus:ring-2
        leading-1 font-bold text-white
        mobile:text-xs
        text-sm
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
        gap-2 p-1
        web:rounded-sm web:bg-primary-500 web:mt-2
        mobile:fixed mobile:bottom-0 mobile:left-0 mobile:right-0 mobile:bg-primary-500 mobile:z-10
    `,
    variants: {
        hidden: {
            true: 'hidden',
            false: 'flex flex-row',
        },
    },
})

const HorizontalTabs = ({ categories }: HorizontalTabsProps) => {
    return (
        <Tab.Group>
            <Tab.List
                className={tabList({
                    hidden: categories.length === 1,
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
