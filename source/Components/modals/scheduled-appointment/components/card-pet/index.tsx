import { PetData } from "~/types/pet-v2"

type CardPetProps = {
    pet: PetData
}

const CardPet = ({ pet }: CardPetProps) => {

    return (
        <section className="flex flex-col justify-center mb-2">
            <div className="gap-2 flex-wrap flex flex-row w-full justify-between">
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Nome do Pet:</strong>
                    {pet.name_pet}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Espécie:</strong>
                    {pet.specie as string}
                </p>
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Raça:</strong>
                    {pet.race as string}
                </p>
            </div>
        </section>
    )
}

export default CardPet