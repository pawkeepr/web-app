import HistoricPage from '~/pages/Modules/tutor/HistoricPage/HistoricPage'

import { LayoutTutor } from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-privates'

const HistoricPageNext = () => {
    return (
        <LayoutTutor>
            <HistoricPage />
        </LayoutTutor>
    )
}

export default HistoricPageNext

export const getServerSideProps = getServerSidePropsPagesPrivates()
