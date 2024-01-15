import FieldDocumentAppointment from '~/Components/molecules/field-document-appointment'
import DefaultLayout from '../_layouts/dashboard/dashboard'

import ContextModalPlus from '~/hooks/use-plus-modal'
import HorizontalTabs from './components/organisms/templates/Horizontal-List'

const PetAndTutors = <T,>() => {
    return (
        <DefaultLayout title="Dashboard">
            <div className="flex justify-end items-center">
                <div className="w-1/2 flex-row flex items-center ">
                    <FieldDocumentAppointment />
                </div>
            </div>
            <HorizontalTabs />
            <ContextModalPlus />
        </DefaultLayout>
    )
}

export default PetAndTutors
