import cn from 'classnames'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import getServerSidePropsPagesGenericsPrivates from '~/helpers/get-server-side-props-pages-generic-privates'
import LoadingPage from '~/pages/Modules/shared/LoadingPage'
import { AttributeTypeProfile } from '~/services/helpers/types'
import { useAppSelector } from '~/store/hooks'
import useProfile from '~/store/hooks/profile/use-profile'

const Dashboard = () => {
    const router = useRouter()
    const { user } = useAppSelector((state) => state.Profile)
    const type_profile = user?.['custom:type_profile']
    useProfile()

    useEffect(() => {
        if (type_profile === AttributeTypeProfile.VETERINARY) {
            router.push('/veterinary/dashboard')
            return
        }

        router.push('/tutor/dashboard')
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
