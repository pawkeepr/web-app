import DashboardPage from '~/pages/Modules/tutor/DashboardPage'

import { LayoutTutor } from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-privates'

const DashboardPageNext = () => {
    return (
        <LayoutTutor>
            <DashboardPage />
        </LayoutTutor>
    )
}

export default DashboardPageNext

export const getServerSideProps = getServerSidePropsPagesPrivates()
