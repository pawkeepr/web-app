'use client';

import React from 'react';

import HeaderTitle from '~/Components/atoms/header-title';

type DashboardLayoutsProps = {
    children: React.ReactNode;
    title?: string;
};

const DashboardLayouts = ({
    children,
    title = 'Dashboard',
}: DashboardLayoutsProps) => {
    return (
        <main className="min-h-screen">
            <HeaderTitle title={title} />
            {children}
        </main>
    );
};

export default DashboardLayouts;
