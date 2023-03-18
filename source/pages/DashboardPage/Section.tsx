'use client'

import React, { useState } from 'react';

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
import Image from 'next/image';
import slack from '~/assets/images/brands/slack.png';
import ActivitiesTab from './ActivitiesTab';
import OverviewTab from './OverviewTab';
import TeamTab from './TeamTab';

const Section = () => {
    //Tab 
    const [activeTab, setActiveTab] = useState('1');

    const toggleTab = (tab: '1' | '2' | '3' | '4') => () => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

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
                                                        <Image src={slack} alt="" className="avatar-xs" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md">
                                                <div>
                                                    <h4 className="fw-bold">Velzon - Admin & Dashboard</h4>
                                                    <div className="hstack gap-3 flex-wrap">
                                                        <div><i className="ri-building-line align-bottom me-1"></i> Themesbrand</div>
                                                        <div className="vr"></div>
                                                        <div>Criado : <span className="fw-medium">15 Sep, 2021</span></div>
                                                        <div className="vr"></div>
                                                        {/* <div>Due Date : <span className="fw-medium">29 Dec, 2021</span></div>
                                                        <div className="vr"></div>
                                                        <div className="badge rounded-pill bg-info fs-12">New</div>
                                                        <div className="badge rounded-pill bg-danger fs-12">High</div> */}
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
                                    {/* <NavItem>
                                        <NavLink
                                            className="fw-bold"
                                            onClick={toggleTab('2')}
                                            href="#">
                                            Documents
                                        </NavLink>
                                    </NavItem> */}
                                    <NavItem>
                                        <NavLink
                                            className="fw-bold"
                                            onClick={toggleTab('3')}
                                            href="#Atividades">
                                            Atividades
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className="fw-bold"
                                            onClick={toggleTab('4')}
                                            href="#Time">
                                            Time
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
                            {/* <TabPane tabId="2">
                            <DocumentsTab />
                        </TabPane> */}
                            <TabPane eventKey="3">
                                <ActivitiesTab />
                            </TabPane>
                            <TabPane eventKey="4">
                                <TeamTab />
                            </TabPane>
                        </TabContent>
                    </TabContainer>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Section;