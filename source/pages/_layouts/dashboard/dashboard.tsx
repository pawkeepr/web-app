"use client";

import React from "react";

import HeaderTitle from "~/Components/atoms/header-title";

type DashboardLayoutsProps = {
    children: React.ReactNode;
    title?: string;
};

const DashboardLayouts = ({
    children,
    title = "Dashboard",
}: DashboardLayoutsProps) => {

    return (
        <>
            <HeaderTitle title={title} />
            <div className="">
                {children}
            </div>
        </>
    );
};

export default DashboardLayouts;
