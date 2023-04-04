
'use client'

import React, { useMemo } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import Row from 'react-bootstrap/Row';

import { useRouter } from 'next/navigation';

//import images

import MyImage from '~/Components/atoms/my-image/my-image';
import { useAppSelector } from '~/store/hooks';

type NavItem = {
    [key: string]: any
    label: string
    onClick: (arg: any) => void
}

type DefaultLayoutProps = {
    children: React.ReactNode
    navItems?: NavItem[]
}

const DefaultLayout = ({ children, navItems }: DefaultLayoutProps) => {

    const router = useRouter()

    const items: NavItem[] = navItems || [
        {
            label: 'Principal',
            onClick: () => {
                router.push('/dashboard')
            }
        }
    ]

    const profile = useAppSelector(state => state.Profile.user)

    const name = useMemo(() => {
        return profile?.firstName + " " + profile?.lastName
    }, [profile]);

    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <Card className="mt-n4 mx-n4">
                        <div className="">
                            <Card className="p-4 pb-0">
                                <Row className="mb-1">
                                    <div className="col-md">
                                        <Row className="align-items-center g-3">
                                            <div className="col-md-auto">
                                                <div className="avatar-md">
                                                    <div className="avatar-title bg-white rounded-circle">
                                                        <MyImage
                                                            src={profile?.avatar || ''}
                                                            alt={`Avatar de ${name}`}
                                                            className="avatar-xs rounded-full"
                                                            fill
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md">
                                                <div>
                                                    <h4 className="fw-bold">{name}</h4>
                                                    <div className="hstack gap-3 flex-wrap">
                                                        <div><i className="ri-building-line align-bottom me-1"></i>{profile?.company}</div>
                                                        <div className="vr"></div>
                                                        <div>Criado : <span className="fw-medium">{profile?.created_at}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Row>
                                    </div>
                                </Row>
                            </Card>
                        </div>
                    </Card>
                </Col>
                <Col lg={12}>
                    <Card className="mt-n4 mx-n4 block">
                        <Nav className="nav-tabs-custom border-bottom-0" role="tablist">
                            {
                                items.map(({ label, onClick, ...rest }, index) => (
                                    <NavItem key={index}>
                                        <NavLink
                                            className="fw-bold"
                                            onClick={onClick}
                                            {...rest}
                                        >
                                            {label}
                                        </NavLink>
                                    </NavItem>
                                ))
                            }
                        </Nav>
                    </Card>
                </Col>

            </Row>

            <Row>
                <Col lg={12}>
                    {children}
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default DefaultLayout