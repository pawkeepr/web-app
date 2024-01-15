import ScheduledNewAppointment from '~/Components/modals/scheduled-appointment'
import FieldDocumentAppointment from '~/Components/molecules/field-document-appointment'
import DefaultLayout from '../_layouts/dashboard/dashboard'

import ContextModalPlus from '~/hooks/use-plus-modal'
import HorizontalTabs from './components/organisms/templates/Horizontal-List'

const AppointmentsTabs = <T,>() => {
    return (
        <DefaultLayout title="Dashboard">
            <div className="flex justify-end items-center">
                <div className="flex-row flex items-center justify-end ">
                    <FieldDocumentAppointment />
                    <ScheduledNewAppointment selectedTabInitial={0} />
                </div>
            </div>
            <HorizontalTabs />
            <ContextModalPlus />
        </DefaultLayout>
    )
}

export default AppointmentsTabs
