import { useCallback } from 'react';
import ModalAddPet from '~/Components/modals/add-pet-modal';
import CardPets from '~/Components/molecules/card-pets';
import ListTab from '~/Components/templates/ListTab';
import { useAppSelector } from '~/store/hooks';
import { Data } from '~/store/slices/pets/types';

const PetsTab = () => {

    const pets = useAppSelector((state) => state.Pets.data);


    const Modal = () => <ModalAddPet />
    const cards = (pets: Data[]) => pets?.map(pet => (<CardPets key={pet?.id} pet={pet} checked={false} />))

    const filter = useCallback((deferredPets: Data[], search: string) => {

        if (!search.trim()) return pets;

        return deferredPets.filter(pet => {
            const lowerSearch = search.toLowerCase();
            return pet.name.toLowerCase().includes(lowerSearch) || pet.breed.toLowerCase().includes(lowerSearch)
        })

    }, [pets])

    return (
        <ListTab items={pets} Modal={Modal} cards={cards} filter={filter} />
    );
};

export default PetsTab;