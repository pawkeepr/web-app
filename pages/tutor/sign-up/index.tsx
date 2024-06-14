import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import useModeProfile from '~/hooks/use-mode'
import SignUpPage from '~/pages/Modules/shared/Authentication/SignUp'

const SignUpPageNext = () => {
    const { onChangeModeProfile } = useModeProfile()

    onChangeModeProfile('tutor')
    return (
        <LayoutAuth>
            <SignUpPage bgImage="/bg-three.jpg" />
        </LayoutAuth>
    )
}

export default SignUpPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
