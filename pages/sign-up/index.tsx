
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import SignUpPage from '~/pages/Authentication/SignUp'

const SignUpPageNext = () => {
    return (
        <SignUpPage />
    )
}

export default SignUpPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()