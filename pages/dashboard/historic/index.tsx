import HistoricPage from '~/pages/Modules/veterinary/HistoricPage'

import LayoutMain from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-privates'

const HistoricPageNext = () => {
    return (
        <LayoutMain>
            <HistoricPage />
        </LayoutMain>
    )
}

export default HistoricPageNext

export const getServerSideProps = getServerSidePropsPagesPrivates()
