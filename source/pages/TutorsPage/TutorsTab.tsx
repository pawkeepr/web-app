import React, { useCallback } from 'react';
import ModalAddTutor from '~/Components/modals/modal-add-tutor';
import CardTutors from '~/Components/molecules/card-tutors';

import { useAppSelector } from '~/store/hooks';

import ListTab from '~/Components/templates/ListTab';
import { Data } from '~/store/tutors/types';

const TutorsTab = () => {
    const tutors = useAppSelector((state) => state.Tutor.data);

    const Modal = () => <ModalAddTutor />
    const cards = (tutors: Data[]) => tutors?.map(tutor => (<CardTutors key={tutor.id} tutor={tutor} />))

    const filter = useCallback((deferredTutors: Data[], search: string) => {

        if (!search.trim()) return tutors;

        return deferredTutors.filter(tutor => {
            const lowerSearch = search.toLowerCase();
            return tutor.name.toLowerCase().includes(lowerSearch)
                || tutor.phone.toLowerCase().includes(lowerSearch)
                || tutor.document.toLowerCase().includes(lowerSearch)
                || tutor.email.toLowerCase().includes(lowerSearch)
        })
    }, [tutors])

    return (
        <React.Fragment>
            <ListTab Modal={Modal} cards={cards} filter={filter} items={tutors} />
        </React.Fragment>
    );
};

export default TutorsTab;