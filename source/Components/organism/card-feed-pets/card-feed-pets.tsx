import AvatarPet from '~/Components/molecules/avatar-pet'
import type { IPetV2Data } from '~/types/pet-v2'
import type { Species } from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'
import ModalBoxButtonsPet from '../box-buttons-pets/modal-box-buttons-pets'
import { card } from '../card'
import { IconGender, iconGender } from '../card-scheduled'

type CardFeedPetProps = {
    pet: IPetV2Data
    hasButtons?: boolean
}

const CardFeedPet = ({ pet }: CardFeedPetProps) => {
    const sex = pet?.sex as keyof typeof IconGender
    const Gender = IconGender[sex]

    return (
        <ModalBoxButtonsPet item={pet}>
            {({ showModal }) => (
                <button
                    onClick={showModal}
                    type="button"
                    className={card({
                        className:
                            'px-2 py-2 w-28 !h-36 flex flex-col items-center justify-center',
                    })}
                >
                    <AvatarPet
                        name_pet={pet?.name_pet}
                        specie={pet.specie as Species}
                        classNames={{
                            img: 'w-20 h-20',
                        }}
                    />
                    <div className="flex flex-row gap-1">
                        <h1 className="text-lg font-bold text-center text-gray-400 mobile:text-sm">
                            {`${pet?.name_pet}`}
                        </h1>
                        <Gender
                            className={iconGender({
                                sex,
                                className: 'mobile:relative bottom-0 right-0',
                            })}
                        />
                    </div>
                    <h2 className="text-xs text-center">
                        {calcAge(pet?.date_birth)} ano(s)
                    </h2>
                </button>
            )}
        </ModalBoxButtonsPet>
    )
}

export default CardFeedPet
