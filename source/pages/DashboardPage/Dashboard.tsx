'use client'

import { useMemo, useState } from 'react';

import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';

//import images

import { useAppSelector } from '~/store/hooks';
import DefaultLayout from '../_layouts/dashboard/dashboard';
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
        return profile?.firstName + " " + profile?.lastName
    }, [profile]);

    const items = [
        {
            label: 'Sobre',
            onClick: toggleTab('1'),
            href: '#About'
        },
        {
            label: 'Consultas',
            onClick: toggleTab('2'),
            href: '#Appointments'
        },
        {
            label: 'Pets',
            onClick: toggleTab('3'),
            href: '#Pets'
        },
        {
            label: 'Tutores',
            onClick: toggleTab('4'),
            href: '#Tutors'
        }
    ]

    return (
        <DefaultLayout navItems={items} title="Dashboard">
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
        </DefaultLayout>

    );
};

export default Section;