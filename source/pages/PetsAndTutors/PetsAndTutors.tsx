import HorizontalTabs from '~/Components/organism/horizontal-list'
import DefaultLayout from '../_layouts/dashboard/dashboard'
import PetsTab from './components/organisms/PetsTab'
import TutorsTab from './components/organisms/TutorsTab'

const Tabs = () => [
    {
        id: 1,
        title: 'Pets',
        href: '#pets',
        tab: <PetsTab />,
    },
    {
        id: 2,
        title: 'Tutores',
        href: '#tutors',
        tab: <TutorsTab />,
    },
]

const PetAndTutors = <T,>() => {
    const tabs = Tabs()
    return (
        <DefaultLayout title="Dashboard" searchBlock={false}>
            <HorizontalTabs categories={tabs} />
        </DefaultLayout>
    )
}

export default PetAndTutors
