import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import ConfirmAccount from '~/pages/Modules/shared/Authentication/ConfirmAccount'

const ConfirmAccountNext = () => {
    return (
        <LayoutAuth>
            <ConfirmAccount />
        </LayoutAuth>
    )
}

export default ConfirmAccountNext

export const getServerSideProps = getServerSidePropsPagesPublics()
