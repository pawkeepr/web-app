import HorizontalTabs from '~/Components/organism/horizontal-list/horizontal-list'
import DefaultLayout from '../../_layouts/dashboard/dashboard'
import StepScheduledAll from './components/organisms/steps/step-scheduled-all'

const Tabs = () => [
    {
        id: 1,
        title: 'Todos os agendamentos',
        href: '#scheduled',
        tab: <StepScheduledAll />,
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
