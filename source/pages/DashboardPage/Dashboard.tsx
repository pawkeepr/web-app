"use client";

import DefaultLayout from "../_layouts/dashboard/dashboard";
import AppointmentsTab from "./components/organisms/tabs/AppointmentsTab";

const Section = () => {
    //Tab
    // const [activeTab, setActiveTab] = useState("1");

    // const toggleTab = (tab: "1" | "2" | "3" | "4") => () => {
    //     if (activeTab !== tab) {
    //         setActiveTab(tab);
    //     }
    // };

    // const items = [
    //     {
    //         label: "Consultas",
    //         onClick: toggleTab("1"),
    //         href: "#Appointments",
    //     },
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
    // ];

    return (
        <DefaultLayout title="Dashboard">
            <AppointmentsTab />
        </DefaultLayout>
    );
};

export default Section;
