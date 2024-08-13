import { useRouter } from 'next/router'
import LayoutAuth from '~/Layouts/LayoutAuth'
import { decodeBase64 } from '~/utils/encode-base-64'
import Profile from '~/pages/Modules/shared/PublicProfilePage/PublicProfile'

const PublicProfile = () => {
    const router = useRouter()
    const { id_tutor } = router.query
    const decode = decodeBase64(id_tutor as string)

    return (
        <LayoutAuth>
            <Profile/>
        </LayoutAuth>
    )
}

export default PublicProfile
