import { FaStethoscope } from 'react-icons/fa'
import { LuBird } from 'react-icons/lu'
import { MdHealthAndSafety, MdPets } from 'react-icons/md'
import BtnFloatingExpansible from '~/Components/molecules/btn-floating-expansible'
import MapCardFeedPets from '~/Components/molecules/map-card-feed-pets'
import HorizontalTabs from '~/Components/organism/horizontal-list'
import useModal from '~/hooks/use-modal'
import SelectPetProvider from '~/hooks/use-selected-pet'
import type { Pet } from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import { useListPetsFromTutor } from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import DefaultLayout from '../../_layouts/dashboard/dashboard'
import PetsTab from '../PetsAndVets/components/organisms/PetsTab'
import VetsTab from '../PetsAndVets/components/organisms/VetsTab'
import SuSPet from '../SusPet'

const Tabs = () => [
    {
        id: 1,
        title: 'Moment Keepr',
        icon: (
            <LuBird className="text-teal-300 mobile:w-5 mobile:h-5 web:w-6 web:h-6" />
        ),
        href: '#moment-Keepr',
        tab: <PetsTab />,
    },
    {
        id: 2,
        title: 'Sua Saúde',
        href: '#health',
        icon: (
            <MdHealthAndSafety className="text-red-300 mobile:w-5 mobile:h-5 web:w-6 web:h-6" />
        ),
        tab: <SuSPet />,
    },
    {
        id: 2,
        title: 'Meus Vets',
        icon: (
            <FaStethoscope className="text-blue-300 mobile:w-5 mobile:h-5 web:w-6 web:h-6" />
        ),
        href: '#veterinarians',
        tab: <VetsTab />,
    },
]

const DashboardPage = () => {
    const tabs = Tabs()
    const { data: pets, isPending, isFetching } = useListPetsFromTutor()

    const { showModal } = useModal({ name: 'search' })

    return (
        <DefaultLayout title="Dashboard" name="appointments" searchBlock>
            <SelectPetProvider>
                {({ selected, onChangeSelectedPet }) => (
                    <div className="flex phone:flex-col">
                        <div className="flex-1 w-full h-full border-secondary-300 web:mr-2 tablet:mr-2 tablet:border-r web:border-r ">
                            <MapCardFeedPets
                                pets={pets as Pet[]}
                                isPending={isPending}
                                isLoading={isFetching}
                                onClick={onChangeSelectedPet}
                                i18nIsDynamicList
                                selected={selected}
                            />
                        </div>
                        <hr className="m-2 mt-4 duration-500 border-secondary-600 border-[1px] hidden phone:block " />

                        <div className="w-full flex-[6]">
                            <HorizontalTabs categories={tabs} menu />
                        </div>
                    </div>
                )}
            </SelectPetProvider>
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
        </DefaultLayout>
    )
}

export default DashboardPage
