import CardPets from '~/Components/organism/card-pets'
import useListPets from '~/store/hooks/list-pets-by-clinic/use-list-pets'

const PetsTab = () => {
    const { data: pets, isLoading, isError } = useListPets()

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Error</div>

    return (
        <section className=" !w-full">
            {pets?.map((pet) => (
                <CardPets key={pet?.id_pet} pet={pet} />
            ))}
        </section>
    )
}

export default PetsTab
