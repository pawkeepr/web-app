import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import getServerSidePropsPagesGenericsPrivates from '~/helpers/get-server-side-props-pages-generic-privates'
import LoadingPage from '~/pages/Modules/shared/LoadingPage'
import { getProfileSession } from '~/store/actions'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import useProfile from '~/store/hooks/profile/use-profile'
import { DASHBOARD_PROFILE } from '~/store/slices/auth/profile/sagas'

const Dashboard = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.Login)
    const router = useRouter()

    const type_profile = user?.['custom:type_profile']
    useProfile()

    useEffect(() => {
        if (!type_profile) return

        dispatch(
            getProfileSession({
                type_profile,
                has_profile: user?.['custom:has_profile'],
            }),
        )
    }, [type_profile])

    useEffect(() => {
        if (!type_profile) return

        router.push(DASHBOARD_PROFILE[type_profile as 1 | 2])
    }, [type_profile])

    return (
        <main
            className={cn(
                'flex flex-1 content-center mobile:content-start items-center justify-center mobile:items-start mobile:justify-start mobile:overflow-hidden',
            )}
        >
            <LoadingPage />
        </main>
    )
}

export default Dashboard

export const getServerSideProps = getServerSidePropsPagesGenericsPrivates()
