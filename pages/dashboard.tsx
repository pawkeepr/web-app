import cn from 'classnames'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LoadingPage from '~/pages/Modules/shared/LoadingPage'
import { AttributeTypeProfile } from '~/services/helpers/types'
import { useAppSelector } from '~/store/hooks'

const Dashboard = () => {
    const router = useRouter()
    const { user } = useAppSelector((state) => state.Profile)
    const type_profile = user?.['custom:type_profile']

    useEffect(() => {
        if (!user) {
            router.push('/sign-in')
        }

        if (type_profile === AttributeTypeProfile.TUTOR) {
            router.push('/tutor/dashboard')
        }

        if (type_profile === AttributeTypeProfile.VETERINARY) {
            router.push('/veterinary/dashboard')
        }
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
