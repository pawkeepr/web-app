'use client'

import PetsTab from '~/pages/PetsAndTutors/components/organisms/PetsTab'
import DefaultLayout from '../_layouts/dashboard/dashboard'

const PetsPage = () => {
    return (
        <DefaultLayout title="Dashboard">
            <PetsTab />
        </DefaultLayout>
    )
}

export default PetsPage
