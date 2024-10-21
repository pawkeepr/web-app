'use client'

import { TabGroup } from '@headlessui/react'
import ItemsList from './items-list'
import MenuList, {
    type TabItem,
    type TabListProps,
    type TabProps,
} from './menu-list'

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
        <TabGroup as="section" className="flex flex-col w-full ">
            <MenuList
                categories={categories}
                bottomNavigation={bottomNavigation}
                classNames={classNames}
                menu={menu}
            />
            <ItemsList categories={categories} classNames={classNames}>
                {children}
            </ItemsList>
        </TabGroup>
    )
}

export default HorizontalTabs
