'use client'

import type React from 'react'

import HeaderTitle from '~/Components/atoms/header-title'
import BlockSearchAndInputDocument from '~/Components/molecules/block-search-and-input-document'
import ContextModalPlus from '~/hooks/use-plus-modal'

type DashboardLayoutsSearch =
    | {
          searchBlock: true
          name: 'appointments' | 'veterinary' | 'tutor' | 'pet' | 'historic'
      }
    | {
          searchBlock?: false
          name?: never
      }

type DashboardLayoutsProps = {
    children: React.ReactNode
    title?: string
} & DashboardLayoutsSearch

const DashboardLayouts = ({
    children,
    title = 'Dashboard',
    searchBlock = true,
    name,
}: DashboardLayoutsProps) => {
    return (
        <main className="min-h-screen">
            <HeaderTitle title={title} />
            {searchBlock && <BlockSearchAndInputDocument name={name as string} />}
            {children}
            <ContextModalPlus />
        </main>
    )
}

export default DashboardLayouts
