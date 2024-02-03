import { useEffect } from 'react'
import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import SignUpPage from '~/pages/Modules/shared/Authentication/SignUp'
import { useAppDispatch } from '~/store/hooks'
import { onChangeTypeProfile } from '~/store/slices/auth/register/actions'
import { TypeProfile } from '~/types/profile'

const SignUpPageNext = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(onChangeTypeProfile(TypeProfile.VETERINARY))

        return () => {
            dispatch(onChangeTypeProfile(TypeProfile.NONE))
        }
    }, [])

    return (
        <LayoutAuth>
            <SignUpPage mode="veterinary" bgImage="/bg-sign-up.webp" />
        </LayoutAuth>
    )
}

export default SignUpPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
