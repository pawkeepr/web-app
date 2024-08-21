import { useRouter } from 'next/router'
import LayoutAuth from '~/Layouts/LayoutAuth'
import PublicProfile from '~/pages/Modules/shared/PublicProfilePage/PublicProfile'

const PublicTutorProfile = () => {
    const router = useRouter()
    const { id_tutor } = router.query

    return (
        <LayoutAuth>
            <PublicProfile id_tutor={id_tutor}/>
        </LayoutAuth>
    )
}

export default PublicTutorProfile
