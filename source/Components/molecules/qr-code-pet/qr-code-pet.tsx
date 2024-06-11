import { QRCode } from 'react-qrcode-logo'
import { encodeBase64 } from '~/utils/encode-base-64'

type QrCodePetProps = {
    id_pet: string
}

const QrCodePet = ({ id_pet }: QrCodePetProps) => {
    const currentUrl = `${window.location.protocol}//${window.location.host}`

    return (
        <QRCode
            value={`${currentUrl}/pet-was-found/${encodeBase64(id_pet)}`}
            logoImage="/logo-sm-qr-code.png"
            logoWidth={30}
            logoHeight={30}
            logoOpacity={1}
            qrStyle="squares"
            size={200}
            removeQrCodeBehindLogo
            eyeRadius={10}
        />
    )
}

export default QrCodePet
