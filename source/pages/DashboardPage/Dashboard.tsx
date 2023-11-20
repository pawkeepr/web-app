"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch } from "~/store/hooks";
import DefaultLayout from "../_layouts/dashboard/dashboard";
import AppointmentTab from "./AppointmentTab";

import CardVeterinaryAppointments from '~/Components/molecules/card-veterinary-appointments';
import { getAll } from '~/store/slices/appointment-vet/actions';
import { Data } from '~/store/slices/appointment-vet/types';

import FieldDocumentAppointment from '~/Components/molecules/field-document-appointment';

const DashboardPage = () => {
    const dispatch = useAppDispatch();

    const veterinaryAppointments = [];

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    const Modal = () => <FieldDocumentAppointment />
    const cards = (veterinaryAppointments: Data[]) => veterinaryAppointments?.map(veterinaryAppointment => (<CardVeterinaryAppointments key={veterinaryAppointment.id} veterinaryAppointments={veterinaryAppointment} />))

    const filter = useCallback((deferredVeterinaryAppointments: Data[], search: string) => {
        // if (!search.trim()) return veterinaryAppointments;

        return deferredVeterinaryAppointments.filter(veterinaryAppointment => {
            const lowerSearch = search.toLowerCase();
            return veterinaryAppointment?.pet?.name?.toLowerCase().includes(lowerSearch)
                || veterinaryAppointment?.tutor?.name?.toLowerCase().includes(lowerSearch)
                || veterinaryAppointment?.tutor?.phone?.toLowerCase().includes(lowerSearch)
                || veterinaryAppointment?.pet?.breed?.toLowerCase().includes(lowerSearch)

        })
    }, [])

    useEffect(() => {
        dispatch(getAll())
    }, []);


    return (
        <DefaultLayout title="Dashboard">
            <AppointmentTab Modal={Modal} cards={cards} filter={filter} items={veterinaryAppointments} />
        </DefaultLayout>
    );
};

export default DashboardPage;
