import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import ModalAddTutor from '~/Components/modals/modal-add-tutor';
import CardTutors from '~/Components/molecules/card-tutors';

import { useAppDispatch, useAppSelector } from '~/store/hooks';

import SearchInput from '~/Components/molecules/search-input/search-input';
import { getTutors } from '~/store/actions';

const TutorsTab = () => {
    const dispatch = useAppDispatch();
    const tutors = useAppSelector((state) => state.Tutor.tutors);

    useEffect(() => {
        dispatch(getTutors());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Row className="g-4 mb-3">
                <div className="col-sm">
                    <SearchInput className="form-control" placeholder='Busque o Tutor...' />
                </div>
                <div className="col-sm-auto">
                    <ModalAddTutor />
                </div>
            </Row>
            <div className="team-list list-view-filter">
                {
                    tutors?.map(tutor => (<CardTutors key={tutor.id} tutor={tutor} />))
                }
            </div>

        </React.Fragment>
    );
};

export default TutorsTab;