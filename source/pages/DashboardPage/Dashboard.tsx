"use client";

import { useEffect } from "react";
import { useAppDispatch } from "~/store/hooks";
import DefaultLayout from "../_layouts/dashboard/dashboard";
import AppointmentsTab from "./AppointmentsTab";

import { getAll } from '~/store/slices/appointment-vet/actions';

const DashboardPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAll())
    }, []);


    return (
        <DefaultLayout title="Dashboard">
            <AppointmentsTab />
        </DefaultLayout>
    );
};

export default DashboardPage;
