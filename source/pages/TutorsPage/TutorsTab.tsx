import React, { useCallback } from 'react';
import AddTutorModal from '~/Components/modals/add-tutor-modal';
import CardTutors from '~/Components/molecules/card-tutors';


import ListTab from '~/Components/templates/ListTab';
import useListTutors from '~/store/hooks/tutors/use-list-tutors';
import { Data } from '~/store/slices/tutors/types';

const TutorsTab = () => {
    const { data: tutors } = useListTutors()

    const Modal = () => <AddTutorModal />
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