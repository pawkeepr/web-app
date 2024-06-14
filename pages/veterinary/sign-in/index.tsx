'use client'

import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import useModeProfile from '~/hooks/use-mode'
import SignInPage from '~/pages/Modules/shared/Authentication/SignIn'

const SignInPageNext = () => {
    const { onChangeModeProfile } = useModeProfile()

    onChangeModeProfile('vet')
    return (
        <LayoutAuth>
            <SignInPage bgImage="/bg-sign-in.webp" />
        </LayoutAuth>
    )
}

export default SignInPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
