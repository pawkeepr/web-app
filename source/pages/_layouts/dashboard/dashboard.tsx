"use client";

import React, { useMemo } from "react";

import NavItem from "react-bootstrap/NavItem";

import { useRouter } from "next/navigation";

import HeaderTitle from "~/Components/atoms/header-title";
import ModalConfirm from "~/Components/modals/modal-confirm/modal-confirm";
import { useAppSelector } from "~/store/hooks";

type F = (arg?: any) => void;

type NavItem = {
    [key: string]: any;
    Element?: (onClick: F) => React.ReactNode;
    label: string;
    onClick: F;
};

type DashboardLayoutsProps = {
    children: React.ReactNode;
    navItems?: NavItem[];
    title?: string;
};

const DashboardLayouts = ({
    children,
    navItems,
    title = "Dashboard",
}: DashboardLayoutsProps) => {
    const router = useRouter();

    const items: NavItem[] = navItems || [
        {
            // label com icon de voltar
            Element: (onClick) => (
                <ModalConfirm
                    title="Cancelar Operações!"
                    onConfirm={onClick}
                    description="Importante!"
                    message="Deseja realmente voltar?"
                >
                    {({ onChangeOpen }) => {
                        return (
                            <button
                                type="button"
                                onClick={() => onChangeOpen(true)}
                            >
                                <span>
                                    <i className="ri-arrow-left-line align-middle"></i>{" "}
                                    Voltar
                                </span>
                            </button>
                        );
                    }}
                </ModalConfirm>
            ),
            label: "Voltar",
            onClick: () => {
                router.push("/dashboard");
            },
        },
    ];

    const profile = useAppSelector((state) => state.Profile.user);

    const name = useMemo(() => {
        return profile?.firstName + " " + profile?.lastName;
    }, [profile]);

    return (
        <div className="px-24 mobile:px-4 py-12 mt-8">
            <HeaderTitle title={title} />
            <div className="">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayouts;
