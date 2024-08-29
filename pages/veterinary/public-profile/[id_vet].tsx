import { useRouter } from 'next/router'
import { decodeBase64 } from '~/utils/encode-base-64'
import VeterinaryProfilePage from '~/pages/Modules/shared/VeterinaryProfilePage'
import LayoutPublicContent from '~/Layouts/LayoutPublicContent'

const PublicVeterinaryProfile = () => {
    const router = useRouter()
    const { id_vet } = router.query
    const decode = decodeBase64(id_vet as string)

    return (
        // TODO: made a public layout
        <LayoutPublicContent>
            <VeterinaryProfilePage id_vet={decode}/>
        </LayoutPublicContent>
    )
}

export default PublicVeterinaryProfile
