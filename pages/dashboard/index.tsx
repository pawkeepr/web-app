
import DashboardPage from '~/pages/DashboardPage/Dashboard'

import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-privates'

const DashboardPageNext = () => {
    return (
        <DashboardPage />
    )
}

export default DashboardPageNext

export const getServerSideProps = getServerSidePropsPagesPrivates()