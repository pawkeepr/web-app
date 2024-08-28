import AvatarPet from '~/Components/molecules/avatar-pet'
import type { PetData } from '~/types/pet-v2'
import type { Species } from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'
import ModalBoxButtonsPet from '../box-buttons-pets/modal-box-buttons-pets'
import { card } from '../card'
import { IconGender, iconGender } from '../card-scheduled'

type CardFeedPetProps = {
    pet: PetData
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
                            'px-2 rounded-xl py-2 w-28 !h-36 flex flex-col items-center justify-center !shadow-theme-3',
                    })}
                    style={{
                        minWidth: '7rem',
                        minHeight: '9rem',
                        maxWidth: '7rem',
                    }} // fix width and height
                >
                    <AvatarPet
                        name_pet={pet?.name_pet}
                        specie={pet.specie as Species}
                        src={pet.url_img as string}
                        classNames={{
                            img: 'w-20 h-20 shadow-theme-3  rounded-full',
                        }}
                    />
                    <div className="flex flex-row gap-1">
                        <h2 className="text-sm font-bold text-center text-gray-400 ">
                            {`${pet?.name_pet}`}
                        </h2>
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
