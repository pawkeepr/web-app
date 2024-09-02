import DashboardPage from '~/pages/Modules/tutor/DashboardPage'

import { LayoutTutor } from '~/Layouts'
import getServerSidePropsPagesTutorPrivates from '~/helpers/get-server-side-props-pages-tutor-privates'

const DashboardPageNext = () => {
    return (
        <LayoutTutor>
            <DashboardPage />
        </LayoutTutor>
    )
}

export default DashboardPageNext

export const getServerSideProps = getServerSidePropsPagesTutorPrivates()
