/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { tv } from 'tailwind-variants'
import useResizeMobile from '~/hooks/use-resize-mobile'

type HorizontalTabsProps = {
    categories: {
        id: number
        title: string
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
        mobile: {
            true: 'text-xs leading-1 font-bold text-white',
            false: 'text-sm leading-1 font-bold text-white',
        },
    },
})

const HorizontalTabs = ({ categories }: HorizontalTabsProps) => {
    const { isMobile } = useResizeMobile()

    return (
        <Tab.Group>
            <Tab.List
                className={cn(
                    'flex gap-2 p-1',
                    isMobile
                        ? 'fixed bottom-0 left-0 right-0 bg-primary-500 z-10'
                        : 'rounded-sm bg-primary-500 mt-2',
                )}
            >
                {categories.map((category) => (
                    <Tab
                        key={category.id}
                        disabled={category.disabled}
                        className={({ selected }) =>
                            tab({
                                selected,
                                disabled: category.disabled,
                                mobile: isMobile,
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
