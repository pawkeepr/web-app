
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import SignUpPage from '~/pages/Authentication/sign-up'

const SignUpPageNext = () => {
    return (
        <SignUpPage />
    )
}

export default SignUpPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()