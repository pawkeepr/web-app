import { Tab } from '@headlessui/react'
import { useMemo } from 'react'
import { FaStethoscope } from 'react-icons/fa'
import { MdPets } from 'react-icons/md'
import BtnFloatingExpansible from '~/Components/molecules/btn-floating-expansible'
import ItemsList from '~/Components/organism/horizontal-list/items-list'
import MenuList from '~/Components/organism/horizontal-list/menu-list'
import useModal from '~/hooks/use-modal'

import MapCardFeedPets from '~/Components/molecules/map-card-feed-pets'
import {
    useListPetsFromTutor,
    type Pet,
} from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'

export type MapCardFeedPetsProps = {
    pets?: Pet[]
    isLoading: boolean
    onClick?: (pet: Pet) => void
    isPending: boolean
    selected?: Pet | null
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
