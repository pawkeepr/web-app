import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import useModeProfile from '~/hooks/use-mode'
import SignUpPage from '~/pages/Modules/shared/Authentication/SignUp'

const SignUpPageNext = () => {
    const { onChangeModeProfile } = useModeProfile()

    onChangeModeProfile('vet')

    return (
        <LayoutAuth>
            <SignUpPage bgImage="/bg-sign-up.webp" />
        </LayoutAuth>
    )
}

export default SignUpPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
