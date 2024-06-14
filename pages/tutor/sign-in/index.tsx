'use client'

import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import useModeProfile from '~/hooks/use-mode'
import SignInPage from '~/pages/Modules/shared/Authentication/SignIn'

const SignInPageNext = () => {
    const { onChangeModeProfile } = useModeProfile()

    onChangeModeProfile('tutor')

    return (
        <LayoutAuth>
            <SignInPage bgImage="/bg-three.jpg" />
        </LayoutAuth>
    )
}

export default SignInPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
