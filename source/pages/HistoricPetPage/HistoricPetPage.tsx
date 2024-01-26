import HorizontalTabs from '~/Components/organism/horizontal-list'
import CreateOrUpdatePetPage from '../NewPetPage/CreateOrUpdatePetPage'
import DefaultLayout from '../_layouts/dashboard/dashboard'
import HistoricPet from './components/template/HistoricPet'

const Tabs = (document?: string, id_pet?: string) => [
    {
        id: 1,
        title: 'Histórico',
        href: '#pets',
        tab: <HistoricPet document={document} id_pet={id_pet} />,
    },
    {
        id: 2,
        title: 'Pet',
        href: '#tutors',
        tab: <CreateOrUpdatePetPage document={document} id_pet={id_pet} />,
    },
]

type HistoricPetPageProps = {
    document?: string
    id_pet?: string
}

const HistoricPetPage = ({ document, id_pet }: HistoricPetPageProps) => {
    const tabs = Tabs(document, id_pet)
    return (
        <DefaultLayout title="Histórico do Pet" searchBlock={false}>
            <HorizontalTabs categories={tabs} />
        </DefaultLayout>
    )
}

export default HistoricPetPage
