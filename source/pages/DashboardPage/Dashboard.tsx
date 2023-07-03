"use client";

import { useState } from "react";

import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";

//import images

import DefaultLayout from "../_layouts/dashboard/dashboard";
import AppointmentsTab from "./components/organisms/tabs/AppointmentsTab";
import OverviewTab from "./components/organisms/tabs/OverviewTab";
import PetsTab from "./components/organisms/tabs/PetsTab";
import TutorsTab from "./components/organisms/tabs/TutorsTab";

const Section = () => {
    //Tab
    const [activeTab, setActiveTab] = useState("1");

    const toggleTab = (tab: "1" | "2" | "3" | "4") => () => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const items = [
        {
            label: "Consultas",
            onClick: toggleTab("1"),
            href: "#Appointments",
        },
        // {
        //     label: "Sobre",
        //     onClick: toggleTab("2"),
        //     href: "#About",
        // },
        // {
        //     label: "Pets",
        //     onClick: toggleTab("3"),
        //     href: "#Pets",
        // },
        // {
        //     label: "Tutores",
        //     onClick: toggleTab("4"),
        //     href: "#Tutors",
        // },
    ];

    return (
        <DefaultLayout navItems={items} title="Dashboard">
            <TabContainer activeKey={activeTab}>
                <TabContent className="text-muted">
                    <TabPane  eventKey="1">
                        <AppointmentsTab />
                    </TabPane>
                    <TabPane  eventKey="2">
                        <OverviewTab />
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
