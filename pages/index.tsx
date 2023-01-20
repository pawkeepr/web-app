import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import LadingPage from '~/pages/LandingPage'

const LadingPagePage = () => {
    return (
        <LadingPage />
    )
}

export default LadingPagePage

export const getServerSideProps = getServerSidePropsPagesPublics()