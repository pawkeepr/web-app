import HistoricPage from '~/pages/HistoricPage'

import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-privates'

const HistoricPageNext = () => {
    return <HistoricPage />
}

export default HistoricPageNext

export const getServerSideProps = getServerSidePropsPagesPrivates()
