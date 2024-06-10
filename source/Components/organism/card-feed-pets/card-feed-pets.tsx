import AvatarPet from '~/Components/molecules/avatar-pet'
import type { IPetV2Data } from '~/types/pet-v2'
import type { Species } from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'
import BoxButtonsPets from '../box-buttons-pets'
import ModalBoxButtonsPet from '../box-buttons-pets/modal-box-buttons-pets'
import Card from '../card'
import { IconGender, iconGender } from '../card-scheduled'

type CardFeedPetProps = {
    pet: IPetV2Data
    hasButtons?: boolean
}

const CardFeedPet = ({ pet }: CardFeedPetProps) => {
    const sex = pet?.sex as keyof typeof IconGender
    const Gender = IconGender[sex]

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
                        <Gender className={iconGender({ sex })} />
                    </div>
                    <h2 className="text-xs text-center">
                        {calcAge(pet?.date_birth)} ano(s)
                    </h2>
                </>
            )}
        >
            <div />
        </Card>
    )
}

export default CardFeedPet
