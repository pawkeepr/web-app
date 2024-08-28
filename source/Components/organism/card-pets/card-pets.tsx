import { useMemo } from 'react'
import AvatarPet from '~/Components/molecules/avatar-pet'
import { useTranslations } from '~/hooks/use-translations'
import { BreedNames } from '~/types/breedType'
import type { PetData } from '~/types/pet-v2'
import { GenderBR, type Gender, type Species } from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'
import BoxButtonsPets from '../box-buttons-pets'
import ModalBoxButtonsPet from '../box-buttons-pets/modal-box-buttons-pets'
import Card from '../card'
import { IconGender } from '../card-scheduled'

type CardPetProps = {
    pet: PetData
    hasButtons?: boolean
}

const CardPet = ({ pet }: CardPetProps) => {
    const { t } = useTranslations('common')

    const item = useMemo(
        () => ({
            ...pet,
            specie: t(pet?.specie as string),
            race: BreedNames[pet?.race as keyof typeof BreedNames],
            sex: GenderBR[pet?.sex as Gender],
        }),
        [pet],
    )

    const Gender = IconGender[pet?.sex as keyof typeof IconGender]

    return (
        <Card
            boxButtons={() => <BoxButtonsPets item={pet} />}
            item={pet}
            modal={ModalBoxButtonsPet}
            className="mobile:!px-2 mobile:!py-2 px-4 py-4 "
            sectionAvatar={() => (
                <>
                    <AvatarPet
                        name_pet={pet?.name_pet}
                        specie={pet.specie as Species}
                    />
                    <div className="flex flex-row gap-1">
                        <h1 className="text-lg font-bold text-center text-gray-400 mobile:text-sm">
                            {`${pet?.name_pet}`}
                        </h1>
                        <Gender />
                    </div>
                    <h2 className="text-xs text-center">
                        {calcAge(pet?.date_birth)} ano(s)
                    </h2>
                </>
            )}
        >
            <>
                <div className="space-y-1 text-gray-500">
                    <div className="text-gray-500 ">
                        <h3 className="font-bold">Pet:</h3>
                        <p>{`${t(item?.specie)}, ${t(item?.race)}`}</p>
                    </div>
                    <div className="text-gray-500 ">
                        <h3 className="font-bold ">Sexo:</h3>
                        <p>{t(item.sex)}</p>
                    </div>
                </div>
            </>
        </Card>
    )
}

export default CardPet
