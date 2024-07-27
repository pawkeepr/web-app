'use client'

import { useEffect } from 'react'
import LayoutAuth from '~/Layouts/LayoutAuth'
import Env from '~/env'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import useModeProfile from '~/hooks/use-mode'
import SignInPage from '~/pages/Modules/shared/Authentication/SignIn'
import { ModeProfile } from '~/types/profile'

const SignInPageNext = () => {
    const { onChangeModeProfile } = useModeProfile()
    const modeProfile = Env().get('MODE_PROFILE') as ModeProfile

    useEffect(() => {
        onChangeModeProfile(modeProfile)
    }, [modeProfile])

    const bgImage =
        modeProfile === ModeProfile.tutor ? '/bg-three.jpg' : '/bg-sign-in.webp'

    return (
        <LayoutAuth>
            <SignInPage bgImage={bgImage} />
        </LayoutAuth>
    )
}

export default SignInPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
