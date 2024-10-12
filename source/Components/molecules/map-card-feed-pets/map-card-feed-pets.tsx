import { card } from '~/Components/organism/card'
import CardFeedPets from '~/Components/organism/card-feed-pets'
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
        <div className="gap-1 mt-1 !overflow-x-auto flex flex-row w-full scrollable-x px-1 mobile:px-2">
            {!isPending &&
                pets?.map((pet) => (
                    <CardFeedPets
                        selected={selected?.id_pet === pet?.id_pet}
                        key={pet?.id_pet}
                        onClick={onClick}
                        pet={{
                            ...pet,
                            cpf_cnpj: profile?.user_information?.cpf_cnpj as string,
                            castrated: pet?.castrated,
                        }}
                    />
                ))}
            {(isLoading || isPending) && (
                <>
                    {[0, 0, 0, 0, 0, 0].map((_, index) => (
                        <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            key={index}
                            className={card({
                                className:
                                    'px-2 my-2 py-2 flex-1 w-28 h-36 bg-gradient-to-r from-white via-gray-200 to-gray-300 animate-pulse',
                            })}
                            style={{
                                minWidth: '7rem ',
                                minHeight: '9rem',
                                maxWidth: '7rem',
                            }} // fix width and height
                        />
                    ))}
                </>
            )}
        </div>
    )
}

export default MapCardFeedPets
