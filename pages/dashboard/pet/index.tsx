import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-privates'
import Page from '~/pages/NewPetPage'

const PetsPage = () => {
    return (
        <Page />
    )
}

export default PetsPage

export const getServerSideProps = getServerSidePropsPagesPrivates()