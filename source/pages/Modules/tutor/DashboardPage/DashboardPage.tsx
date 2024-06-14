import { FaCalendarCheck, FaStethoscope } from 'react-icons/fa'
import { MdPets } from 'react-icons/md'
import HorizontalTabs from '~/Components/organism/horizontal-list'
import DefaultLayout from '../../_layouts/dashboard/dashboard'
import PetsTab from '../PetsAndVets/components/organisms/PetsTab'
import VetsTab from '../PetsAndVets/components/organisms/VetsTab'
import StepScheduledAll from './components/organisms/steps/step-scheduled-all'

const Tabs = () => [
    {
        id: 1,
        title: 'Meus Pets',
        icon: <MdPets className="w-6 h-4" />,
        href: '#pets',
        tab: <PetsTab />,
    },
    {
        id: 2,
        title: 'Consultas',
        href: '#scheduled',
        icon: <FaCalendarCheck className="w-6 h-4" />,
        tab: <StepScheduledAll />,
    },
    {
        id: 2,
        title: 'Meus Vets',
        icon: <FaStethoscope className="w-6 h-4" />,
        href: '#veterinarians',
        tab: <VetsTab />,
    },
]

const DashboardPage = () => {
    const tabs = Tabs()
    return (
        <DefaultLayout title="Dashboard" name="appointments" searchBlock>
            <HorizontalTabs categories={tabs} menu />
        </DefaultLayout>
    )
}

export default DashboardPage
