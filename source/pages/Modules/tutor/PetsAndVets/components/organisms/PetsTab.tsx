import { RadioGroup } from "@headlessui/react";
import CardPets from "~/Components/organism/card-pets";
import ListTab from "~/Components/templates/ListTab";
import useListPets from "~/store/hooks/list-appointments-by-pet/use-list-appointments-by-pet";
import type { IPetV2Data } from "~/types/pet-v2";

const PetsTab = () => {
    const {
        data: pets,
        isLoading,
        isError,
    } = useListPets({ mode: "scheduled" });

    const cards = (pets: IPetV2Data[]) =>
        pets?.map((pet) => <CardPets key={pet?.id_pet} pet={pet} />);

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error</div>;

    return (
        <RadioGroup>
            <ListTab items={pets || []} cards={cards} />
        </RadioGroup>
    );
};

export default PetsTab;
