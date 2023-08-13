"use client";

import { useEffect } from "react";
import { useAppDispatch } from "~/store/hooks";
import DefaultLayout from "../_layouts/dashboard/dashboard";
import PetsTab from "./PetsTab";

import { getAll } from '~/store/pets/actions';

const PetsPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAll())
    }, []);

    return (
        <DefaultLayout title="Dashboard">
            <PetsTab />
        </DefaultLayout>
    );
};

export default PetsPage;
