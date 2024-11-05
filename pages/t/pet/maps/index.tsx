import { LayoutTutor } from '~/Layouts'
import getServerSidePropsPagesPrivates from '~/helpers/get-server-side-props-pages-tutor-privates'
import Page from '~/pages/Modules/tutor/PetMapsPage'

const PetsPage = () => {
    return (
        <LayoutTutor>
            <Page />
        </LayoutTutor>
    )
}

export default PetsPage

export const getServerSideProps = getServerSidePropsPagesPrivates()
