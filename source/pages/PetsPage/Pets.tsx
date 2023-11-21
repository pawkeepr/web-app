"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import DefaultLayout from "../_layouts/dashboard/dashboard";
import PetsTab from "./PetsTab";

import { getAll } from '~/store/slices/pets/actions';
import CardPets from "~/Components/molecules/card-pets";

const PetsPage = () => {
    const dispatch = useAppDispatch();
    const pets = useAppSelector((state) => state.Pets.data);


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
