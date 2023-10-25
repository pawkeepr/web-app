"use client";

import { useEffect } from "react";
import { useAppDispatch } from "~/store/hooks";
import DefaultLayout from "../_layouts/dashboard/dashboard";
import Tab from "./TutorsTab";

import { getAll } from '~/store/slices/tutors/actions';

const PetsPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAll())
    }, []);

    return (
        <DefaultLayout title="Tutores">
            <Tab />
        </DefaultLayout>
    );
};

export default PetsPage;
