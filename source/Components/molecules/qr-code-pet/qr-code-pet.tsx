import { useRef } from 'react'
import { QRCode } from 'react-qrcode-logo'
import { useReactToPrint } from 'react-to-print'
import { BtnNeutral } from '~/Components/atoms/btn'
import { encodeBase64 } from '~/utils/encode-base-64'

type QrCodePetProps = {
    id_pet: string
}

const QrCodePet = ({ id_pet }: QrCodePetProps) => {
    const currentUrl = `${window.location.protocol}//${window.location.host}`
    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef?.current,
        pageStyle: `
            @page {
                size: A4;
                margin: 0;
            }

            body {
                margin: 0;
            }

            @page {
                size: A4; // em pé por padrão
            }
    `,
    })

    return (
        <div className="flex flex-col items-center justify-center">
            <div
                ref={componentRef}
                className="flex items-center justify-center flex-1 w-full bg-white"
            >
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
            <BtnNeutral
                label="Imprimir"
                type="button"
                onClick={handlePrint}
                outline
                className="border-none"
            />
        </div>
    )
}

export default QrCodePet
