import { FaCalendarCheck } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi2'
import { MdOutlinePets } from 'react-icons/md'
import HorizontalTabs from '~/Components/organism/horizontal-list/horizontal-list'
import DefaultLayout from '../../_layouts/dashboard/dashboard'
import PetsTab from './components/organisms/steps/step-pets'
import StepScheduledAll from './components/organisms/steps/step-scheduled-all'
import TutorsTab from './components/organisms/steps/step-tutors'

const Tabs = () => [
    {
        id: 1,
        title: 'Agendamentos',
        href: '#scheduled',
        icon: <FaCalendarCheck className="w-6 h-4" />,
        tab: <StepScheduledAll />,
    },
    {
        id: 2,
        title: 'Pets',
        href: '#pets',
        icon: <MdOutlinePets className="w-6 h-6" />,
        tab: <PetsTab />,
    },
    {
        id: 3,
        title: 'Tutores',
        href: '#tutors',
        icon: <HiUserGroup className="w-6 h-6" />,
        tab: <TutorsTab />,
    },
]

const AppointmentsTabs = () => {
    const tabs = Tabs()
    return (
        <DefaultLayout title="Dashboard" name="appointments" searchBlock>
            <HorizontalTabs categories={tabs} />
        </DefaultLayout>
    )
}

export default AppointmentsTabs
