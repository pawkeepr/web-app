import React, { useCallback, useEffect } from 'react';
import CardVeterinaryAppointments from '~/Components/molecules/card-veterinary-appointments/card-veterinary-appointments';
import { getAll } from '~/store/appointment-vet/actions';
import { Data } from '~/store/appointment-vet/types';
import { useAppDispatch } from '~/store/hooks';
import ListTab from '../../Components/templates/ListTab';

import FieldDocumentAppointment from '../../Components/molecules/field-document-appointment';


const VeterinaryAppointmentsTab = () => {

    const dispatch = useAppDispatch();
    const veterinaryAppointments = [];

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    const Modal = () => <FieldDocumentAppointment />
    const cards = (veterinaryAppointments: Data[]) => veterinaryAppointments?.map(veterinaryAppointment => (<CardVeterinaryAppointments key={veterinaryAppointment.id} veterinaryAppointments={veterinaryAppointment} />))

    const filter = useCallback((deferredVeterinaryAppointments: Data[], search: string) => {
        if (!search.trim()) return veterinaryAppointments;

        return deferredVeterinaryAppointments.filter(veterinaryAppointment => {
            const lowerSearch = search.toLowerCase();
            return veterinaryAppointment?.pet?.name?.toLowerCase().includes(lowerSearch)
                || veterinaryAppointment?.tutor?.name?.toLowerCase().includes(lowerSearch)
                || veterinaryAppointment?.tutor?.phone?.toLowerCase().includes(lowerSearch)
                || veterinaryAppointment?.pet?.breed?.toLowerCase().includes(lowerSearch)

        })
    }, [])

    return (
        <React.Fragment>
            <ListTab Modal={Modal} cards={cards} filter={filter} items={veterinaryAppointments} />
        </React.Fragment>
    );
};

export default VeterinaryAppointmentsTab;