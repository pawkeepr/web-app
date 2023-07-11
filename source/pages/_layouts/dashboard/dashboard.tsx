"use client";

import React, { useMemo } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import Row from "react-bootstrap/Row";

import { useRouter } from "next/navigation";

//import images

import HeaderTitle from "~/Components/atoms/header-title";
import MyImage from "~/Components/atoms/my-image/my-image";
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
        <div className="page-content">
            <HeaderTitle title={title} />
            <div className="container container-fluid">
                <React.Fragment>
                    <Row>
                        <Col lg={12}>
                            <Card className="mt-1 mx-1 mobile:hidden">
                                <Card className="p-4 pb-0">
                                    <Row className="items-center gap-4">
                                        {/* <div className="col-md-auto flex justify-center align-middle self-center pb-2">
                                            <div className="avatar-md w-32 h-32">
                                                <div className="avatar-title bg-white rounded-circle relative mt-2">
                                                    <MyImage
                                                        src={
                                                            profile?.avatar ||
                                                            ""
                                                        }
                                                        alt={`Avatar de ${name}`}
                                                        className="avatar-xs rounded-full"
                                                        fill
                                                    />
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="col-md">
                                            <h4 className="text-base font-bold mobile:text-center">
                                                Seja bem vindo, {name} !
                                            </h4>
                                            {/* <div className="hstack gap-3 flex-wrap mobile:flex mobile:items-center mobile:justify-center">
                                                <div>
                                                    <i className="ri-building-line align-bottom me-1"></i>
                                                    {profile?.company}
                                                </div>
                                                <div className="vr mobile:hidden"></div>
                                                <div>
                                                    Criado :{" "}
                                                    <span className="fw-medium">
                                                        {profile?.created_at}
                                                    </span>
                                                </div>
                                            </div> */}
                                        </div>
                                    </Row>
                                </Card>
                            </Card>
                        </Col>
                        <Col lg={12}>
                            <Card className="mx-1 block mobile:flex mobile:items-center mobile:justify-center">
                                <Nav
                                    className="nav-tabs-custom border-bottom-0"
                                    role="tablist"
                                >
                                    {items.map(
                                        (
                                            {
                                                label,
                                                onClick,
                                                Element,
                                                ...rest
                                            },
                                            index
                                        ) => (
                                            <NavItem key={index}>
                                                {Element && (
                                                    <NavLink
                                                        className="fw-bold"
                                                        {...rest}
                                                    >
                                                        {Element(onClick)}
                                                    </NavLink>
                                                )}

                                                {!Element && (
                                                    <NavLink
                                                        className="fw-bold"
                                                        onClick={onClick}
                                                        {...rest}
                                                    >
                                                        {label}
                                                    </NavLink>
                                                )}
                                            </NavItem>
                                        )
                                    )}
                                </Nav>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>{children}</Col>
                    </Row>
                </React.Fragment>
            </div>
        </div>
    );
};

export default DashboardLayouts;
