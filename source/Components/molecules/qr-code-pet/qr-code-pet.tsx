import { QRCode } from 'react-qrcode-logo'

type QrCodePetProps = {
    id_pet: string
}

const QrCodePet = ({ id_pet }: QrCodePetProps) => {
    return (
        <QRCode
            value={id_pet}
            logoImage="/logo-sm-qr-code.png"
            logoWidth={40}
            logoHeight={40}
            logoOpacity={1}
            qrStyle="squares"
            removeQrCodeBehindLogo
            eyeRadius={10}
        />
    )
}

export default QrCodePet
