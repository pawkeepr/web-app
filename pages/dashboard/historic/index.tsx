import HistoricPage from '~/pages/Modules/veterinary/HistoricPage'

import { LayoutVeterinary } from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-privates'

const HistoricPageNext = () => {
    return (
        <LayoutVeterinary>
            <HistoricPage />
        </LayoutVeterinary>
    )
}

export default HistoricPageNext

export const getServerSideProps = getServerSidePropsPagesPrivates()
