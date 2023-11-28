"use client";

import DefaultLayout from "../_layouts/dashboard/dashboard";
import PetsTab from "./PetsTab";


const PetsPage = () => {

    return (
        <DefaultLayout title="Dashboard">
            <PetsTab />
        </DefaultLayout>
    );
};

export default PetsPage;
