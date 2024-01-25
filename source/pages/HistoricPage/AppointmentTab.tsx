import DefaultLayout from '../_layouts/dashboard/dashboard'

import HorizontalTabs from '~/Components/organism/horizontal-list/horizontal-list'
import StepScheduledCanceled from './components/organisms/steps/step-scheduled-canceled'
import StepScheduledDone from './components/organisms/steps/step-scheduled-done'

const Tabs = () => [
    {
        id: 3,
        title: 'Consultas Canceladas',
        href: '#canceled',
        tab: <StepScheduledCanceled />,
    },
    {
        id: 5,
        title: 'Consultas Finalizadas',
        href: '#done',
        tab: <StepScheduledDone />,
    },
]

const AppointmentsTabs = <T,>() => {
    const categories = Tabs()

    return (
        <DefaultLayout title="Dashboard" searchBlock name="historic">
            <HorizontalTabs categories={categories} />
        </DefaultLayout>
    )
}

export default AppointmentsTabs
