import { MdPets } from 'react-icons/md'
import { BtnLinkFloating } from '~/Components/molecules/btn-floating/btn-floating'
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
        return <span>Carregando...</span>
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
        <section className="w-full px-4 mobile:!px-2">
            {pets?.length === 0 && (
                <div className="text-center">
                    <span>Não há Pets Cadastrados</span>
                </div>
            )}

            <MapCardFeedPets pets={pets as Pet[]} isLoading={isPending} />

            <BtnLinkFloating
                icon={(props) => <MdPets {...props} />}
                title="Adicionar Pet"
                href="/tutor/pet"
            />
        </section>
    )
}

export default PetsTab
