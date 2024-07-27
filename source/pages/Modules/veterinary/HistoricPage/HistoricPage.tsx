import DefaultLayout from '../../_layouts/dashboard/dashboard'

import { MdCancel, MdCheckCircle } from 'react-icons/md'
import HorizontalTabs from '~/Components/organism/horizontal-list/horizontal-list'
import StepScheduledCanceled from './components/organisms/steps/step-scheduled-canceled'
import StepScheduledDone from './components/organisms/steps/step-scheduled-done'

const Tabs = () => [
    {
        id: 5,
        title: 'Consultas Realizadas',
        href: '#done',
        icon: <MdCheckCircle className="w-6 h-6" />,
        tab: <StepScheduledDone />,
    },
    {
        id: 3,
        title: 'Consultas Canceladas',
        href: '#canceled',
        icon: <MdCancel className="w-6 h-6" />,
        tab: <StepScheduledCanceled />,
    },
]

const HistoricPage = () => {
    const categories = Tabs()

    return (
        <DefaultLayout title="Dashboard" searchBlock name="historic">
            <HorizontalTabs categories={categories} menu />
        </DefaultLayout>
    )
}

export default HistoricPage
