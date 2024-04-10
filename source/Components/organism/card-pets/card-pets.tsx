import { useMemo } from 'react'
import AvatarPet from '~/Components/molecules/avatar-pet'
import { BreedNames } from '~/types/breedType'
import type { IPetV2Data } from '~/types/pet-v2'
import {
    GenderBR,
    MapOptionSpecies,
    Species,
    type Gender,
} from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'
import BoxButtonsPets from '../box-buttons-pets'
import ModalBoxButtonsPet from '../box-buttons-pets/modal-box-buttons-pets'
import Card from '../card'
import { IconGender } from '../card-scheduled'

type CardPetProps = {
    pet: IPetV2Data
    hasButtons?: boolean
}

const CardPet = ({ pet }: CardPetProps) => {
    const item = useMemo(
        () => ({
            ...pet,
            specie: Species[pet?.specie as keyof typeof Species],
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
            sectionAvatar={() => (
                <>
                    <AvatarPet
                        name_pet={pet?.name_pet}
                        specie={
                            MapOptionSpecies[
                            pet.specie as keyof typeof MapOptionSpecies
                            ] as Species
                        }
                    />
                    <div className="flex flex-row gap-1">
                        <h1 className="text-center font-bold text-lg mobile:text-sm text-gray-400">
                            {`${pet?.name_pet}`}
                        </h1>
                        <Gender />
                    </div>
                    <h2 className="text-center text-xs">
                        {calcAge(pet?.date_birth)} ano(s)
                    </h2>
                </>
            )}
        >
            <>
                <div className="text-gray-500 space-y-1">
                    <div className="text-gray-500 ">
                        <h3 className="font-bold">Pet:</h3>
                        <p>{`${item?.specie}, ${item?.race}`}</p>
                    </div>
                    <div className="text-gray-500 ">
                        <h3 className="font-bold ">Sexo:</h3>
                        <p>{item.sex}</p>
                    </div>
                </div>
            </>
        </Card>
    )
}

export default CardPet
