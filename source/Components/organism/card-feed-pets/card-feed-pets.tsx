import { tv } from 'tailwind-variants'
import AvatarPet from '~/Components/molecules/avatar-pet'
import type { Pet } from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import type { Species } from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'
import ModalBoxButtonsPet from '../box-buttons-pets/modal-box-buttons-pets'
import { IconGender, iconGender } from '../card-scheduled'

type CardFeedPetProps = {
    pet: Pet
    hasButtons?: boolean
    selected?: boolean
    onClick?: (pet: Pet) => void
}

export const card = tv({
    base: `
        w-full justify-center items-center text-left 
        h-[68px] overflow-hidden flex web:flex-row phone:flex-col phone:max-w-[7rem] phone:h-[7rem] phone:w-28 gap-2  
        rounded-xl cursor-pointer hover:bg-gray-100 hover:bg-opacity-50 !min-h-fit shadow-none border-none
    `,
    variants: {
        selected: {
            true: '!border-2 !border-secondary-500',
        },
    },
})

const CardFeedPet = ({ pet, onClick, selected }: CardFeedPetProps) => {
    const sex = pet?.sex as keyof typeof IconGender
    const Gender = IconGender[sex]

    return (
        <ModalBoxButtonsPet item={pet}>
            {({ showModal }) => (
                <button
                    onClick={() => {
                        if (onClick) {
                            onClick(pet)
                        } else {
                            showModal()
                        }
                    }}
                    type="button"
                    className={card({ selected })}
                >
                    <AvatarPet
                        name_pet={pet?.name_pet}
                        specie={pet.specie as Species}
                        src={pet.url_img as string}
                        classNames={{
                            img: `w-16 h-16 shadow-theme-3 rounded-full p-[2px] transition-all duration-100  ${
                                selected ? 'border-2 border-secondary-500 ' : ''}`,
                        }}
                    />
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-row gap-1">
                            <h2 className="text-xs font-semibold text-center text-gray-400 ">
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
                    </div>
                </button>
            )}
        </ModalBoxButtonsPet>
    )
}

export default CardFeedPet
