import HorizontalTabs from '~/Components/organism/horizontal-list'
import usePetById from '~/store/hooks/pet/use-pets'
import { GenderBR } from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'
import CreateOrUpdatePetPage from '../NewPetPage/CreateOrUpdatePetPage'
import SocialLinks from '../ProfilePage/components/SocialLinks'
import UserProfileCard from '../ProfilePage/components/UserProfileCard'
import DefaultLayout from '../_layouts/dashboard/dashboard'
import HistoricPet from './components/template/HistoricPet'

const Tabs = (document?: string, id_pet?: string) => [
    {
        id: 2,
        title: 'Dados do Pet',
        href: '#tutors',
        tab: <CreateOrUpdatePetPage document={document} id_pet={id_pet} />,
    },
    {
        id: 1,
        title: 'Consultas Anteriores',
        href: '#before-consults',
        tab: <HistoricPet document={document} id_pet={id_pet} />,
    },
    {
        id: 1,
        title: 'Prontuário',
        disabled: true,
        href: '#chart',
        tab: <HistoricPet document={document} id_pet={id_pet} />,
    },
    {
        id: 1,
        title: 'Arquivos',
        disabled: true,
        href: '#files',
        tab: <HistoricPet document={document} id_pet={id_pet} />,
    },
]

type HistoricPetPageProps = {
    document?: string
    id_pet?: string
}

const HistoricPetPage = ({ document, id_pet }: HistoricPetPageProps) => {
    const tabs = Tabs(document, id_pet)
    const { activeData: pet, isLoading } = usePetById(
        document as string,
        id_pet as string,
    )

    if (isLoading) return <div>Carregando...</div>

    return (
        <DefaultLayout title="Histórico do Pet" searchBlock={false}>
            <div className="container mx-auto">
                <div className="flex flex-wrap flex-1 mobile:flex-col">
                    <div className="w-full flex flex-1 flex-col px-4">
                        <UserProfileCard
                            name={pet?.pet_information?.name_pet}
                            specie={pet?.pet_information?.specie as string}
                            subtitle={`${
                                GenderBR[
                                    pet?.pet_information
                                        ?.sex as keyof typeof GenderBR
                                ]
                            },
                                ${calcAge(pet?.pet_information?.date_birth)} ano(s)
                                `}
                            title={`${pet?.pet_information?.name_pet}, ${pet?.pet_information?.specie}, ${pet?.pet_information?.race}`}
                        />
                        <SocialLinks
                            whatsapp={
                                pet?.main_responsible_guardian?.contact
                                    ?.whatsapp as string
                            }
                        />
                    </div>
                    <div className="w-full flex flex-[3] px-4 mt-10 web:mt-0 mobile:!flex-1 overflow-hidden">
                        <HorizontalTabs categories={tabs} />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default HistoricPetPage
