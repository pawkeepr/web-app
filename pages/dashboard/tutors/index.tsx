import LayoutMain from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-privates'
import Page from '~/pages/TutorsPage'

const TutorsPage = () => {
    return (
        <LayoutMain>
            <Page />
        </LayoutMain>
    )
}

export default TutorsPage

export const getServerSideProps = getServerSidePropsPagesPrivates()
