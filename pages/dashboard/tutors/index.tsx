import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-privates'
import Page from '~/pages/TutorsPage'

const TutorsPage = () => {
    return (
        <Page />
    )
}

export default TutorsPage

export const getServerSideProps = getServerSidePropsPagesPrivates()