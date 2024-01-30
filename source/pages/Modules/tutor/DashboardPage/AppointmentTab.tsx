import { FaCalendarCheck, FaStethoscope } from 'react-icons/fa'
import { MdPets } from 'react-icons/md'
import HorizontalTabs from '~/Components/organism/horizontal-list/horizontal-list'
import DefaultLayout from '../../_layouts/dashboard/dashboard'
import PetsTab from '../../veterinary/DashboardPage/components/organisms/steps/step-pets'
import TutorsTab from '../../veterinary/DashboardPage/components/organisms/steps/step-tutors'
import StepScheduledAll from './components/organisms/steps/step-scheduled-all'

const Tabs = () => [
    {
        id: 1,
        title: 'Todos os agendamentos',
        href: '#scheduled',
        icon: <FaCalendarCheck className="w-6 h-4" />,
        tab: <StepScheduledAll />,
    },
    {
        id: 1,
        title: 'Meus Pets',
        icon: <MdPets className="w-6 h-4" />,
        href: '#pets',
        tab: <PetsTab />,
    },
    {
        id: 2,
        title: 'Veterinários',
        icon: <FaStethoscope className="w-6 h-4" />,
        href: '#veterinarians',
        tab: <TutorsTab />,
    },
]

const AppointmentsTabs = <T,>() => {
    const tabs = Tabs()
    return (
        <DefaultLayout title="Dashboard" name="appointments" searchBlock>
            <HorizontalTabs categories={tabs} />
        </DefaultLayout>
    )
}

export default AppointmentsTabs
