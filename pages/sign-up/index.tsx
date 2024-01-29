import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import SignUpPage from '~/pages/Modules/veterinary/Authentication/SignUp'

const SignUpPageNext = () => {
    return (
        <LayoutAuth>
            <SignUpPage />
        </LayoutAuth>
    )
}

export default SignUpPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
