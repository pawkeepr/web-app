import { Tab } from '@headlessui/react'
import { useMemo } from 'react'
import { FaStethoscope } from 'react-icons/fa'
import { MdPets } from 'react-icons/md'
import BtnFloatingExpansible from '~/Components/molecules/btn-floating-expansible'
import { card } from '~/Components/organism/card'
import CardFeedPets from '~/Components/organism/card-feed-pets'
import ItemsList from '~/Components/organism/horizontal-list/items-list'
import MenuList from '~/Components/organism/horizontal-list/menu-list'
import useModal from '~/hooks/use-modal'

import {
    useListPetsFromTutor,
    type Pet,
} from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import useProfile from '~/store/hooks/profile/use-profile'

type MapCardFeedPetsProps = {
    pets?: Pet[]
    isLoading: boolean
    isPending: boolean
}

const MapCardFeedPets = ({ pets, isPending, isLoading }: MapCardFeedPetsProps) => {
    const { data: profile } = useProfile()

    if (!pets?.length) {
        return (
            <div className="text-center w-full !h-32 flex items-center justify-center">
                <span>Não há Pets Cadastrados</span>
            </div>
        )
    }

    return (
        <div className="gap-1 mt-1 !overflow-x-auto flex flex-row w-full scrollable-x">
            {!isPending &&
                pets?.map((pet) => (
                    <CardFeedPets
                        key={pet?.id_pet}
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

const Tabs = () => [
    {
        id: 1,
        title: 'Para Você',
        href: '#ForYou',
        tab: (
            <section className="flex items-center justify-center flex-1 min-h-[30vh] text-center text-xs font-sans">
                Estamos Trabalhando no seu Feed de Amigos. Confie em nós. Beba água!
            </section>
        ),
    },
    {
        id: 2,
        title: 'Seguindo',
        href: '#Following',
        tab: (
            <section className="flex items-center justify-center flex-1 min-h-[30vh] text-center text-xs font-sans">
                Estamos Trabalhando no seu Feed Global. Confie em nós. Beba água!
            </section>
        ),
    },
]

const PetsTab = () => {
    const { data: pets, isPending, isFetching } = useListPetsFromTutor()
    const { showModal } = useModal({ name: 'search' })
    const categories = useMemo(() => Tabs(), [])
    return (
        <Tab.Group
            as="section"
            className="flex flex-1 flex-col w-full px-4 mobile:!px-2 mt-1"
        >
            <MenuList categories={categories} mobile={false} mode="simple" />

            <MapCardFeedPets
                pets={pets as Pet[]}
                isPending={isPending}
                isLoading={isFetching}
            />

            <ItemsList categories={categories} />

            <BtnFloatingExpansible
                childLinks={[
                    {
                        icon: MdPets,
                        title: 'Adicionar Pet',
                        href: '/tutor/pet',
                    },
                    {
                        icon: FaStethoscope,
                        title: 'Buscar Veterinário',
                        onClick: () => {
                            showModal()
                        },
                    },
                ]}
            />
        </Tab.Group>
    )
}

export default PetsTab
