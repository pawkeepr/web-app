import MapCardFeedPets from '~/Components/molecules/map-card-feed-pets'
import {
    useListPetsFromTutor,
    type Pet,
} from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'

const HealthPlan = () => {
    const { data: pets, isPending, isFetching } = useListPetsFromTutor()
    return (
        <div>
            <MapCardFeedPets
                onClick={(pet) => {
                    console.log(pet)
                }}
                pets={pets as Pet[]}
                isPending={isPending}
                isLoading={isFetching}
            />
        </div>
    )
}

export default HealthPlan
