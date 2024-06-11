'use client'

import { Tab } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import type { TabItem } from './menu-list'

type HorizontalTabsProps = {
    categories: TabItem[]
    children?: React.ReactNode
    classNames?: {
        tabList?: string
        tab?: string
        panel?: string
    }
}

const ItemsList = ({
    children,
    categories,
    classNames = {},
}: HorizontalTabsProps) => {
    return (
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
    )
}

export default ItemsList
