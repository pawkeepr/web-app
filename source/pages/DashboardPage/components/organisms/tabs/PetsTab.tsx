import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import ModalAddPet from '~/Components/modals/modal-add-pet';
import CardPets from '~/Components/molecules/card-pets';
import { getPets } from '~/store/actions';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

const PetsTab = () => {

    const dispatch = useAppDispatch();
    const pets = useAppSelector((state) => state.Pets.pets);

    useEffect(() => {
        dispatch(getPets());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Row className="g-4 mb-3">
                <div className="col-sm">
                    <div className="d-flex">
                        <div className="search-box me-2">
                            <input type="text" className="form-control" placeholder="Search member..." />
                            <i className="ri-search-line search-icon"></i>
                        </div>
                    </div>
                </div>
                <div className="col-sm-auto">
                    <ModalAddPet />
                </div>
            </Row>
            <div className="team-list list-view-filter">
                {
                    pets?.map(pet => (<CardPets key={pet.id} pet={pet} />))
                }
            </div>

        </React.Fragment>
    );
};

export default PetsTab;