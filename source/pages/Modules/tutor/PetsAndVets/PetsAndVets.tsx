import { HiUserGroup } from 'react-icons/hi2'
import { MdOutlinePets } from 'react-icons/md'
import HorizontalTabs, { type TabItem } from '~/Components/organism/horizontal-list'
import DefaultLayout from '../../_layouts/dashboard/dashboard'
import PetsTab from './components/organisms/PetsTab-legado'
import VetsTab from './components/organisms/VetsTab'

const Tabs = (): TabItem[] => [
    {
        id: 1,
        title: 'Pets',
        href: '#pets',
        icon: <MdOutlinePets className="w-6 h-6" />,
        tab: <PetsTab />,
    },
    {
        id: 2,
        title: 'Veterinários',
        href: '#veterinarians',
        icon: <HiUserGroup className="w-6 h-6" />,
        tab: <VetsTab />,
    },
]

const PetAndTutors = () => {
    const tabs = Tabs()
    return (
        <DefaultLayout title="Tutor-Dashboard" searchBlock={false}>
            <HorizontalTabs categories={tabs} menu />
        </DefaultLayout>
    )
}

export default PetAndTutors
