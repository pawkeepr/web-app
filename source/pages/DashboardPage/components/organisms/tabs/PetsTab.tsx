import React, { useCallback, useEffect } from 'react';
import ModalAddPet from '~/Components/modals/modal-add-pet';
import CardPets from '~/Components/molecules/card-pets';
import { getPets } from '~/store/actions';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Pet } from '~/store/pets/types';
import ListTab from '../templates/ListTab';

const PetsTab = () => {

    const dispatch = useAppDispatch();
    const pets = useAppSelector((state) => state.Pets.pets);

    useEffect(() => {
        dispatch(getPets());
    }, [dispatch]);

    const Modal = () => <ModalAddPet />
    const cards = (pets: Pet[]) => pets?.map(pet => (<CardPets key={pet?.id} pet={pet} />))

    const filter = useCallback((deferredPets: Pet[], search: string) => {

        if (!search.trim()) return pets;

        return deferredPets.filter(pet => {
            const lowerSearch = search.toLowerCase();
            return pet.name.toLowerCase().includes(lowerSearch)
                || pet.breed.toLowerCase().includes(lowerSearch)
                || pet.ownerEmergencyContact.name.toLowerCase().includes(lowerSearch)
                || pet.ownerEmergencyContact.phone.toLowerCase().includes(lowerSearch)
                
        })
    }, [pets])

    return (
        <React.Fragment>
            <ListTab items={pets} Modal={Modal} cards={cards} filter={filter} />
        </React.Fragment>
    );
};

export default PetsTab;