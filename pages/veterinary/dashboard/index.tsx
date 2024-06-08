import DashboardPage from '~/pages/Modules/veterinary/DashboardPage'

import { LayoutVeterinary } from '~/Layouts'
import getServerSidePropsPagesVeterinaryPrivates from '~/helpers/get-server-side-props-pages-veterinary-privates'

const DashboardPageNext = () => {
    return (
        <LayoutVeterinary>
            <DashboardPage />
        </LayoutVeterinary>
    )
}

export default DashboardPageNext

export const getServerSideProps = getServerSidePropsPagesVeterinaryPrivates()
