'use client'

import type React from 'react'

import HeaderTitle from '~/Components/atoms/header-title'
import ContextModalPlus from '~/hooks/use-plus-modal'

type DashboardLayoutsProps = {
    children: React.ReactNode
    title?: string
}

const DashboardLayouts = ({
    children,
    title = 'Dashboard',
}: DashboardLayoutsProps) => {
    return (
        <main className="min-h-screen">
            <HeaderTitle title={title} />
            {children}
            <ContextModalPlus />
        </main>
    )
}

export default DashboardLayouts
