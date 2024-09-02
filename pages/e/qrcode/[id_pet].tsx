import { useRouter } from 'next/router'
import { useId } from 'react'
import QrCodePetWeb from '~/Components/molecules/qr-code-pet/qr-code-pet.web'
import LayoutAuth from '~/Layouts/LayoutAuth'
import AuthLayout from '~/pages/Modules/_layouts/auth/auth_layout'
import { decodeBase64 } from '~/utils/encode-base-64'

const QrCodePage = () => {
    const _id = useId()
    const router = useRouter()
    const { id_pet } = router.query
    const decode = decodeBase64(id_pet as string)

    return (
        <LayoutAuth>
            <AuthLayout title="QrCode">
                <QrCodePetWeb id_pet={decode} name_pet={_id} />
            </AuthLayout>
        </LayoutAuth>
    )
}

export default QrCodePage
