import DefaultLayout from '../../_layouts/dashboard/dashboard'

import { MdCancel, MdCheckCircle } from 'react-icons/md'
import HorizontalTabs from '~/Components/organism/horizontal-list/horizontal-list'
import StepScheduledCanceled from './components/organisms/steps/step-scheduled-canceled'
import StepScheduledDone from './components/organisms/steps/step-scheduled-done'

const Tabs = () => [
    {
        id: 3,
        title: 'Canceladas',
        href: '#canceled',
        icon: (
            <MdCancel className="w-6 h-6" />
            // <div style={{ position: 'relative', display: 'inline-block' }}>
            //     <MdDescription size="1.5rem" /> {/* Ícone de Documento */}
            //     <MdOutlineCancel
            //         size="0.8rem"
            //         style={{
            //             position: 'absolute',
            //             top: '0',
            //             right: '0',
            //             color: '#732C2C',
            //         }}
            //     />{' '}
            //     {/* Ícone de Cancelamento */}
            // </div>
        ),
        tab: <StepScheduledCanceled />,
    },
    {
        id: 5,
        title: 'Finalizadas',
        href: '#done',
        icon: <MdCheckCircle className="w-6 h-6" />,
        tab: <StepScheduledDone />,
    },
]

const HistoricPage = () => {
    const categories = Tabs()

    return (
        <DefaultLayout title="Tutor-Historic" name="historic" searchBlock>
            <HorizontalTabs categories={categories} menu />
        </DefaultLayout>
    )
}

export default HistoricPage
