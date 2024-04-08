import { RadioGroup } from '@headlessui/react'
import CardPets from '~/Components/organism/card-pets'
import useListPets from '~/store/hooks/list-appointments-by-pet/use-list-appointments-by-pet'

const PetsTab = () => {
    const { activeData: pets, isLoading, isError } = useListPets({ mode: 'scheduled' })

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Error</div>

    return (
        <RadioGroup>
            {pets?.map((pet) => (
                <CardPets key={pet?.id_pet} pet={pet} />
            ))}
        </RadioGroup>
    )
}

export default PetsTab
