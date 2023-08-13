"use client";

import { useEffect } from "react";
import { useAppDispatch } from "~/store/hooks";
import DefaultLayout from "../_layouts/dashboard/dashboard";
import AppointmentsTab from "./components/organisms/tabs/AppointmentsTab";

import { getAll } from '~/store/appointment-vet/actions';

const Section = () => {
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

export default Section;
