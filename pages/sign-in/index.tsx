'use client'

import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import SignInPage from '~/pages/Modules/shared/Authentication/SignIn'

const SignInPageNext = () => {
    return (
        <LayoutAuth>
            <SignInPage />
        </LayoutAuth>
    )
}

export default SignInPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
