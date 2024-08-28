import { useRouter } from 'next/router'
import LayoutAuth from '~/Layouts/LayoutAuth'
import { decodeBase64 } from '~/utils/encode-base-64'
import VeterinaryProfilePage from '~/pages/Modules/shared/VeterinaryProfilePage'

const PublicVeterinaryProfile = () => {
    const router = useRouter()
    const { id_vet } = router.query
    const decode = decodeBase64(id_vet as string)

    return (
        <LayoutAuth>
            <VeterinaryProfilePage id_vet={decode}/>
        </LayoutAuth>
    )
}

export default PublicVeterinaryProfile
