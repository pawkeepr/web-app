'use client'

import type React from 'react'

import HeaderTitle from '~/Components/atoms/header-title'
import BlockSearchAndInputDocument from '~/Components/molecules/block-search-and-input-document'
import ContextModalPlus from '~/hooks/use-plus-modal'

type DashboardLayoutsProps = {
    children: React.ReactNode
    title?: string
    searchBlock?: boolean
}

const DashboardLayouts = ({
    children,
    title = 'Dashboard',
    searchBlock = true,
}: DashboardLayoutsProps) => {
    return (
        <main className="min-h-screen">
            <HeaderTitle title={title} />
            {searchBlock && <BlockSearchAndInputDocument />}
            {children}
            <ContextModalPlus />
        </main>
    )
}

export default DashboardLayouts
