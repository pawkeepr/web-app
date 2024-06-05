import { useTranslations } from '~/hooks/use-translations'
import type { IPet } from '~/types/pet'

type CardPetProps = {
    pet: Pick<IPet, 'name' | 'race' | 'specie'>
}

const CardPet = ({ pet }: CardPetProps) => {
    const { t } = useTranslations('common')

    return (
        <section className="flex flex-col justify-center mb-2">
            <div className="flex flex-col flex-wrap justify-between w-full gap-2">
                <p className="flex justify-between text-gray-500">
                    <strong className="mr-2">Pet:</strong>
                    <span>
                        {`${pet?.name}, ${t(pet?.specie)}, ${t(
                            pet?.race as string,
                        )}`}
                    </span>
                </p>
            </div>
        </section>
    )
}

export default CardPet
