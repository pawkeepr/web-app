import { useEffect } from 'react'
import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import useModeProfile from '~/hooks/use-mode'
import SignUpPage from '~/pages/Modules/shared/Authentication/SignUp'
import { ModeProfile } from '~/types/profile'

const SignUpPageNext = () => {
    const { onChangeModeProfile } = useModeProfile()

    useEffect(() => {
        onChangeModeProfile(ModeProfile.vet)
    }, [])

    return (
        <LayoutAuth>
            <SignUpPage bgImage="/bg-sign-up.webp" />
        </LayoutAuth>
    )
}

export default SignUpPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
