import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import ModalAddPet from '~/Components/modals/modal-add-pet';
import CardPets from '~/Components/molecules/card-pets';
import SearchInput from '~/Components/molecules/search-input/search-input';
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
                    <SearchInput className="form-control" placeholder='Busque o Pet...' />
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