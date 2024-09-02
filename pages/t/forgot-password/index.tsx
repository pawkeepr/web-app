import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'

import ForgotPasswordPage from '~/pages/Modules/shared/Authentication/ForgotPassword'

const ForgotPasswordPageNext = () => {
    return (
        <LayoutAuth>
            <ForgotPasswordPage />
        </LayoutAuth>
    )
}

export default ForgotPasswordPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
