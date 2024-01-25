import DefaultLayout from '../_layouts/dashboard/dashboard'

import HorizontalTabs from './components/templates/Horizontal-List'

const PetAndTutors = <T,>() => {
    return (
        <DefaultLayout title="Dashboard" searchBlock={false}>
            <HorizontalTabs />
        </DefaultLayout>
    )
}

export default PetAndTutors
