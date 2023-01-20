import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'

import ForgetPasswordPage from '~/pages/Authentication/ForgetPassword'

const ForgetPasswordPageNext = () => {
    return (
        <ForgetPasswordPage />
    )
}

export default ForgetPasswordPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()