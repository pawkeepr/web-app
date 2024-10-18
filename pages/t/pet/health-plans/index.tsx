import { LayoutTutor } from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-tutor-privates'
import Page from '~/pages/Modules/tutor/HealthPlanPage'

const HealthPlanPage = () => {
    return (
        <LayoutTutor>
            <Page />
        </LayoutTutor>
    )
}

export default HealthPlanPage

export const getServerSideProps = getServerSidePropsPagesPrivates()
