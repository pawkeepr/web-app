import { FaShare } from 'react-icons/fa'
import { QRCode } from 'react-qrcode-logo'
import { BtnNeutral } from '~/Components/atoms/btn'
import { encodeBase64 } from '~/utils/encode-base-64'
import type { QrCodePetProps } from './qr-code-pet'

const QrCodePetMobile = ({ id_pet }: QrCodePetProps) => {
    const currentUrl = `${window.location.protocol}//${window.location.host}`

    const handleShared = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: 'Pet was found',
                    text: 'Pet was found',
                    url: `${currentUrl}/pet-was-found/${encodeBase64(id_pet)}`,
                })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error))
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center flex-1 w-full bg-white">
                <div>
                    <QRCode
                        value={`${currentUrl}/pet-was-found/${encodeBase64(
                            id_pet,
                        )}`}
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
            </div>
            <BtnNeutral
                label="Compartilhar"
                type="button"
                icon={<FaShare className="w-4 h-4" />}
                onClick={handleShared}
                outline
                className="text-xs border-none"
            />
        </div>
    )
}

export default QrCodePetMobile
