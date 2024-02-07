import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import SignUpPage from '~/pages/Modules/shared/Authentication/SignUp'

const SignUpPageNext = () => {
    return (
        <LayoutAuth>
            <SignUpPage mode="tutor" bgImage="/bg-three.jpg" />
        </LayoutAuth>
    )
}

export default SignUpPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
