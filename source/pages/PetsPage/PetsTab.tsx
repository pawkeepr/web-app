import React, { useCallback } from 'react';
import ModalAddPet from '~/Components/modals/modal-add-pet';
import CardPets from '~/Components/molecules/card-pets';
import ListTab from '~/Components/templates/ListTab';
import { useAppSelector } from '~/store/hooks';
import { Data } from '~/store/pets/types';

const PetsTab = () => {

    const pets = useAppSelector((state) => state.Pets.data);


    const Modal = () => <ModalAddPet />
    const cards = (pets: Data[]) => pets?.map(pet => (<CardPets key={pet?.id} pet={pet} />))

    const filter = useCallback((deferredPets: Data[], search: string) => {

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