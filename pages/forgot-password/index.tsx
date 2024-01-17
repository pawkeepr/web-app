import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'

import ForgetPasswordPage from '~/pages/Authentication/ForgotPassword'

const ForgetPasswordPageNext = () => {
    return (
        <LayoutAuth>
            <ForgetPasswordPage />
        </LayoutAuth>
    )
}

export default ForgetPasswordPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
