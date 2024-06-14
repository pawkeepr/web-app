'use client'

import { useEffect } from 'react'
import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import useModeProfile from '~/hooks/use-mode'
import SignInPage from '~/pages/Modules/shared/Authentication/SignIn'
import { ModeProfile } from '~/types/profile'

const SignInPageNext = () => {
    const { onChangeModeProfile } = useModeProfile()

    useEffect(() => {
        onChangeModeProfile(ModeProfile.tutor)
    }, [])

    return (
        <LayoutAuth>
            <SignInPage bgImage="/bg-three.jpg" />
        </LayoutAuth>
    )
}

export default SignInPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
