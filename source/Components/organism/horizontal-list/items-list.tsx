'use client'

import { TabPanel, TabPanels } from '@headlessui/react'
import { Fade } from 'react-awesome-reveal'
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
        <TabPanels
            className=" 
                    relative w-full web:px-2 mobile:px-0 mt-2
                    mobile:items-center mobile:flex mobile:!h-fit mobile:flex-col mobile:w-full
                    tablet:py-0 tablet:items-center tablet:flex tablet:!h-fit tablet:flex-col
                "
        >
            {children}
            {categories.map((item) => (
                <TabPanel
                    key={item.id}
                    className={twMerge(
                        'w-full p-0 mobile:bg-opacity-100 ',
                        classNames.panel,
                    )}
                >
                    <Fade>{item.tab}</Fade>
                </TabPanel>
            ))}
        </TabPanels>
    )
}

export default ItemsList
