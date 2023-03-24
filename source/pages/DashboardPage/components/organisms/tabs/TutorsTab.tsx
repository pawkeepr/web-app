import React, { useCallback, useEffect } from 'react';
import ModalAddTutor from '~/Components/modals/modal-add-tutor';
import CardTutors from '~/Components/molecules/card-tutors';

import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { getTutors } from '~/store/actions';
import { Tutor } from '~/store/tutor/types';
import ListTab from '../templates/ListTab';

const TutorsTab = () => {
    const dispatch = useAppDispatch();
    const tutors = useAppSelector((state) => state.Tutor.tutors);

    useEffect(() => {
        dispatch(getTutors());
    }, [dispatch]);

    const Modal = () => <ModalAddTutor />
    const cards = (tutors: Tutor[]) => tutors?.map(tutor => (<CardTutors key={tutor.id} tutor={tutor} />))

    const filter = useCallback((deferredTutors: Tutor[], search: string) => {

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