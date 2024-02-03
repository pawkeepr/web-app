import { useEffect } from 'react'
import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import SignUpPage from '~/pages/Modules/shared/Authentication/SignUp'
import { onChangeTypeProfile } from '~/store/actions'
import { useAppDispatch } from '~/store/hooks'
import { TypeProfile } from '~/types/profile'

const SignUpPageNext = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(onChangeTypeProfile(TypeProfile.TUTOR))

        return () => {
            dispatch(onChangeTypeProfile(TypeProfile.NONE))
        }
    }, [])

    return (
        <LayoutAuth>
            <SignUpPage mode="tutor" bgImage="/bg-three.jpg" />
        </LayoutAuth>
    )
}

export default SignUpPageNext

export const getServerSideProps = getServerSidePropsPagesPublics()
