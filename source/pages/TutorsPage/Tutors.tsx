"use client";

import DefaultLayout from "../_layouts/dashboard/dashboard";
import Tab from "./TutorsTab";


const TutorsPage = () => {

    return (
        <DefaultLayout title="Tutores">
            <Tab />
        </DefaultLayout>
    );
};

export default TutorsPage;
