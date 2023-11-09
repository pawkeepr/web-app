import { useCallback, useEffect } from 'react';
import CardVeterinaryAppointments from '~/Components/molecules/card-veterinary-appointments';
import ListTab from '~/Components/templates/ListTab';
import { useAppDispatch } from '~/store/hooks';
import { getAll } from '~/store/slices/appointment-vet/actions';
import { Data } from '~/store/slices/appointment-vet/types';

import FieldDocumentAppointment from '~/Components/molecules/field-document-appointment';


const VeterinaryAppointmentsTab = () => {

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

    return (
        <ListTab Modal={Modal} cards={cards} filter={filter} items={veterinaryAppointments} />

    );
};

export default VeterinaryAppointmentsTab;