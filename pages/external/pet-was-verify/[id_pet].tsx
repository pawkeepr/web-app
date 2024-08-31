import { useRouter } from 'next/router'
import LayoutAuth from '~/Layouts/LayoutAuth'
import PetWasVerify from '~/pages/Modules/shared/PetWasVerify'
import { decodeBase64 } from '~/utils/encode-base-64'

const PetWasVerifyNext = () => {
    const router = useRouter()
    const { id_pet } = router.query
    const decode = decodeBase64(id_pet as string)

    return (
        <LayoutAuth>
            <PetWasVerify id_pet={decode} />
        </LayoutAuth>
    )
}

export default PetWasVerifyNext
