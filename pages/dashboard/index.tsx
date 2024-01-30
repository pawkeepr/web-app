import DashboardPage from '~/pages/Modules/veterinary/DashboardPage'

import { Suspense } from 'react'
import LayoutMain from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-privates'
import LoadingPage from '~/pages/Modules/shared/LoadingPage/LoadingPage'

const DashboardPageNext = () => {
    return (
        <Suspense fallback={<LoadingPage />}>
            <LayoutMain>
                <DashboardPage />
            </LayoutMain>
        </Suspense>
    )
}

export default DashboardPageNext

export const getServerSideProps = getServerSidePropsPagesPrivates()
