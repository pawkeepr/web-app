'use client'

import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import SignInPage from '~/pages/Authentication/SignIn'

const SignInPageNext = () => {
    return (
        <SignInPage />
    )
}

export default SignInPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()