import { useRouter } from 'next/router'
import LayoutAuth from '~/Layouts/LayoutAuth'
import PetMedicalRecords from '~/pages/Modules/shared/PetMedicalRecords'
import { decodeBase64 } from '~/utils/encode-base-64'

const PetMedicalRecordsPublic = () => {
    const router = useRouter()
    const { id_pet } = router.query
    const decode = decodeBase64(id_pet as string)

    return (
        <LayoutAuth>
            <PetMedicalRecords id_pet={decode} />
        </LayoutAuth>
    )
}

export default PetMedicalRecordsPublic