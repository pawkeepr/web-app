import { Slide } from 'react-awesome-reveal'
import type { MapCardFeedPetsProps } from '~/pages/Modules/tutor/PetsAndVets/components/organisms/PetsTab'
import type { Species } from '~/types/speciesType'
import AvatarPet from '../avatar-pet'
const BadgesCardPets = ({
    pets,
    isPending = false,
    isLoading = false,
    onClick,
    selected,
}: MapCardFeedPetsProps) => {
    if (pets?.length === 0 && !isPending && !isLoading) {
        return (
            <div className="text-center w-full !h-32 flex items-center justify-center">
                <span>Não há Pets Cadastrados</span>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap w-full gap-2 px-1 phone:flex-row scrollable-y mobile:px-2">
            {!isPending &&
                pets?.map((pet, index) => (
                    <Slide key={pet?.id_pet} direction="bottom" delay={index * 100}>
                        <button onClick={() => onClick?.(pet)} type="button">
                            <AvatarPet
                                name_pet={pet?.name_pet}
                                specie={pet.specie as Species}
                                src={pet.url_img as string}
                                classNames={{
                                    img: `w-20 h-20 shadow-theme-3 rounded-full p-[2px] transition-all duration-100  ${
                                        selected?.id_pet === pet?.id_pet
                                            ? 'border-2 border-secondary-500 '
                                            : ''
                                    }`,
                                }}
                            />
                        </button>
                    </Slide>
                ))}
        </div>
    )
}

export default BadgesCardPets
