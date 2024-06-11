import { useRouter } from 'next/router'
import LayoutAuth from '~/Layouts/LayoutAuth'
import PetWasFound from '~/pages/Modules/shared/PetWasFound'
import { decodeBase64 } from '~/utils/encode-base-64'

const PetWasFoundNext = () => {
    const router = useRouter()
    const { id_pet } = router.query
    const decode = decodeBase64(id_pet as string)

    return (
        <LayoutAuth>
            <PetWasFound id_pet={decode} />
        </LayoutAuth>
    )
}

export default PetWasFoundNext
