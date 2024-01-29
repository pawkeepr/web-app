import DashboardPage from '~/pages/Modules/veterinary/DashboardPage'

import LayoutMain from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-privates'

const DashboardPageNext = () => {
    return (
        <LayoutMain>
            <DashboardPage />
        </LayoutMain>
    )
}

export default DashboardPageNext

export const getServerSideProps = getServerSidePropsPagesPrivates()
