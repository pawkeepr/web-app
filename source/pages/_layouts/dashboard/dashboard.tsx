'use client'

import type React from 'react'

import HeaderTitle from '~/Components/atoms/header-title'
import FieldDocumentAppointment from '~/Components/molecules/field-document-appointment'
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
            <div className="flex justify-end items-center">
                <div className="flex-row flex items-center justify-end ">
                    <FieldDocumentAppointment />
                </div>
            </div>
            {children}
            <ContextModalPlus />
        </main>
    )
}

export default DashboardLayouts
