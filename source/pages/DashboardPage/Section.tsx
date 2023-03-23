'use client'

import React, { useMemo, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import Row from 'react-bootstrap/Row';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';

//import images

import MyImage from '~/Components/atoms/my-image/my-image';
import { useAppSelector } from '~/store/hooks';
import OverviewTab from './components/organisms/tabs/OverviewTab';
import PetsTab from './components/organisms/tabs/PetsTab';
import TutorsTab from './components/organisms/tabs/TutorsTab';
import VeterinaryAppointmentsTab from './components/organisms/tabs/VeterinaryAppointmentsTab';

const Section = () => {
    //Tab 
    const [activeTab, setActiveTab] = useState('1');

    const profile = useAppSelector(state => state.Profile.user)

    const toggleTab = (tab: '1' | '2' | '3' | '4') => () => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const name = useMemo(() => {
        return profile?.company || profile?.firstName + " " + profile?.lastName
    }, [profile]);

    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <Card className="mt-n4 mx-n4">
                        <div className="bg-soft-warning">
                            <Card className="p-4 pb-0">
                                <Row className="mb-1">
                                    <div className="col-md">
                                        <Row className="align-items-center g-3">
                                            <div className="col-md-auto">
                                                <div className="avatar-md">
                                                    <div className="avatar-title bg-white rounded-circle">
                                                        <MyImage
                                                            src={profile?.avatar}
                                                            alt={`Avatar de ${profile?.firstName}`}
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

                                <Nav className="nav-tabs-custom border-bottom-0" role="tablist">
                                    <NavItem>
                                        <NavLink
                                            className="fw-bold"
                                            onClick={toggleTab('1')}
                                            href="#Principal">
                                            Principal
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className="fw-bold"
                                            onClick={toggleTab('2')}
                                            href="#Consultas">
                                            Consultas
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className="fw-bold"
                                            onClick={toggleTab('3')}
                                            href="#Pets">
                                            Pets
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className="fw-bold"
                                            onClick={toggleTab('4')}
                                            href="#Tutors">
                                            Tutores
                                        </NavLink>
                                    </NavItem>

                                </Nav>
                            </Card>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <TabContainer activeKey={activeTab}>
                        <TabContent className="text-muted">
                            <TabPane eventKey="1">
                                <OverviewTab />
                            </TabPane>
                            <TabPane eventKey="2">
                                <VeterinaryAppointmentsTab />
                            </TabPane>
                            <TabPane eventKey="3">
                                <PetsTab />
                            </TabPane>
                            <TabPane eventKey="4">
                                <TutorsTab />
                            </TabPane>
                        </TabContent>
                    </TabContainer>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Section;