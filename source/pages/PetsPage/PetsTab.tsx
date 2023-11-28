import { RadioGroup } from '@headlessui/react';
import { useCallback } from 'react';
import ModalAddPet from '~/Components/modals/add-pet-modal';
import CardPets from '~/Components/molecules/card-pets';
import ListTab from '~/Components/templates/ListTab';
import useListPets from '~/store/hooks/pets/use-list-pets';
import { IPetV2Data } from '~/types/pet-v2';

const PetsTab = () => {

    const { data: pets, isLoading, isError } = useListPets()

    const Modal = () => <ModalAddPet />
    const cards = (pets: IPetV2Data[]) => pets?.map(pet => (<CardPets key={pet?.id} pet={pet} checked={false} />))

    const filter = useCallback((deferredPets: IPetV2Data[], search: string) => {

        if (!search.trim()) return pets;

        return deferredPets.filter(pet => {
            const lowerSearch = search.toLowerCase();
            return pet.name_pet.toLowerCase().includes(lowerSearch) || pet.race.toLowerCase().includes(lowerSearch)
        })

    }, [pets])

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Error</div>

    return (
        <RadioGroup>
            <ListTab items={pets} Modal={Modal} cards={cards} filter={filter} />
        </RadioGroup>
    );
};

export default PetsTab;