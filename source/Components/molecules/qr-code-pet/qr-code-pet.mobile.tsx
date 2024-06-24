import { FaWhatsapp } from 'react-icons/fa'
import { QRCode } from 'react-qrcode-logo'
import { BtnNeutral } from '~/Components/atoms/btn'
import { encodeBase64 } from '~/utils/encode-base-64'
import type { QrCodePetProps } from './types'

import { WhatsappShareButton } from 'react-share'

const QrCodePetMobile = ({ id_pet }: QrCodePetProps) => {
    const currentUrl = `${window.location.protocol}//${window.location.host}`

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center flex-1 w-full bg-white">
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
            </div>
            <WhatsappShareButton
                url={`${currentUrl}/qrcode/${encodeBase64(id_pet)}`}
                title="TagKeepr"
            >
                <BtnNeutral
                    label="Compartilhar"
                    type="button"
                    icon={<FaWhatsapp className="w-4 h-4 text-primary-500" />}
                    outline
                    className="text-xs border-none"
                />
            </WhatsappShareButton>
        </div>
    )
}

export default QrCodePetMobile
