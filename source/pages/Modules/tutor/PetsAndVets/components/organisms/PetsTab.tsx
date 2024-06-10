import { MdPets } from 'react-icons/md'
import { BtnLinkFloating } from '~/Components/molecules/btn-floating/btn-floating'
import { card } from '~/Components/organism/card'
import CardFeedPets from '~/Components/organism/card-feed-pets'

import {
    useListPetsFromTutor,
    type Pet,
} from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import useProfile from '~/store/hooks/profile/use-profile'

type MapCardFeedPetsProps = {
    pets?: Pet[]
    isLoading: boolean
}

const MapCardFeedPets = ({ pets, isLoading }: MapCardFeedPetsProps) => {
    const { data: profile } = useProfile()

    if (isLoading) {
        return (
            <div className="w-full gap-1 mt-1 overflow-x-auto h-fit scrollable-x">
                {[0, 0, 0, 0].map((_, index) => (
                    <div
                        key={index}
                        className={card({
                            className:
                                'w-28 !h-32 bg-gradient-to-r from-white via-gray-200 to-gray-300 animate-pulse',
                        })}
                    />
                ))}
            </div>
        )
    }

    if (!pets) {
        return (
            <div className="text-center w-full !h-32 flex items-center justify-center">
                <span>Não há Pets Cadastrados</span>
            </div>
        )
    }

    return (
        <div className="gap-1 mt-1 overflow-x-auto scrollable-x">
            {pets?.map((pet) => (
                <CardFeedPets
                    key={pet?.id_pet}
                    pet={{
                        ...pet,
                        cpf_cnpj: profile?.user_information?.cpf_cnpj as string,
                        castrated: pet?.castrated === 'yes',
                    }}
                />
            ))}
        </div>
    )
}

const PetsTab = () => {
    const { data: pets, isPending } = useListPetsFromTutor()

    return (
        <section className="flex flex-1 flex-col w-full px-4 mobile:!px-2">
            {pets?.length === 0 && (
                <div className="text-center">
                    <span>Não há Pets Cadastrados</span>
                </div>
            )}

            <MapCardFeedPets pets={pets as Pet[]} isLoading={isPending} />
            <section className="flex items-center justify-center flex-1 min-h-[50vh] ">
                Estamos Trabalhando no seu Feed. Confie em nós. Beba água!
            </section>
            <BtnLinkFloating
                icon={(props) => <MdPets {...props} />}
                title="Adicionar Pet"
                href="/tutor/pet"
            />
        </section>
    )
}

export default PetsTab
