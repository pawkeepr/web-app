import type { IPet } from '~/types/pet'
import { Species } from '~/types/speciesType'

type CardPetProps = {
    pet: Pick<IPet, 'name' | 'race' | 'specie'>
}

const CardPet = ({ pet }: CardPetProps) => {
    return (
        <section className="flex flex-col justify-center mb-2">
            <div className="gap-2 flex-wrap flex flex-col w-full justify-between">
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Pet:</strong>
                    <span>
                        {`${pet?.name}, ${
                            Species[pet?.specie as keyof typeof Species]
                        }, ${pet?.race as string}`}
                    </span>
                </p>
            </div>
        </section>
    )
}

export default CardPet
