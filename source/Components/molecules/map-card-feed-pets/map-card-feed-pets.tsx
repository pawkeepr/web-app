import { Slide } from 'react-awesome-reveal'
import CardFeedPets, { card } from '~/Components/organism/card-feed-pets'
import type { MapCardFeedPetsProps } from '~/pages/Modules/tutor/PetsAndVets/components/organisms/PetsTab'
import useProfile from '~/store/hooks/profile/use-profile'
const MapCardFeedPets = ({
    pets,
    isPending,
    isLoading,
    onClick,
    selected,
}: MapCardFeedPetsProps) => {
    const { data: profile } = useProfile()

    if (pets?.length === 0 && !isPending && !isLoading) {
        return (
            <div className="text-center w-full !h-32 flex items-center justify-center">
                <span>Não há Pets Cadastrados</span>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full gap-1 px-1 phone:flex-row scrollable-y mobile:px-2">
            {!isPending &&
                pets?.map((pet, index) => (
                    <Slide key={pet?.id_pet} direction="left" delay={index * 100}>
                        <CardFeedPets
                            selected={selected?.id_pet === pet?.id_pet}
                            key={pet?.id_pet}
                            onClick={onClick}
                            pet={{
                                ...pet,
                                cpf_cnpj: profile?.user_information
                                    ?.cpf_cnpj as string,
                                castrated: pet?.castrated,
                            }}
                        />
                    </Slide>
                ))}
            {(isLoading || isPending) &&
                [0, 0, 0].map((_, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <Slide key={index} direction="left" delay={index * 100}>
                        <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            key={index}
                            className={card({
                                className:
                                    'w-full  bg-gradient-to-r from-white via-gray-200 to-gray-300 animate-pulse',
                            })}
                            style={{
                                minWidth: '7rem ',
                                minHeight: '9rem',
                            }} // fix width and height
                        />
                    </Slide>
                ))}
        </div>
    )
}

export default MapCardFeedPets
