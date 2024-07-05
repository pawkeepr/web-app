import { useRef } from 'react'
import { FaDownload, FaPrint } from 'react-icons/fa'
import { QRCode } from 'react-qrcode-logo'
import { useReactToPrint } from 'react-to-print'
import { BtnNeutral } from '~/Components/atoms/btn'
import { encodeBase64 } from '~/utils/encode-base-64'
import type { QrCodePetProps } from './types'

const QrCodePetWeb = ({ id_pet, name_pet }: QrCodePetProps) => {
    const currentUrl = `${window.location.protocol}//${window.location.host}`
    const componentRef = useRef()
    const qrCodeRef = useRef<HTMLDivElement>(null)

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

    const handleDownload = () => {
        if (qrCodeRef.current) {
            const canvas = qrCodeRef.current.querySelector('canvas')
            if (canvas) {
                const link = document.createElement('a')
                link.href = canvas.toDataURL('image/jpeg')
                link.download = `${name_pet}-tagPkeepr.jpeg`
                link.click()
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div
                ref={componentRef}
                className="flex items-center justify-center flex-1 w-full bg-white"
            >
                <div ref={qrCodeRef}>
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
                label="Baixar TagPkeepr"
                type="button"
                icon={<FaDownload className="w-4 h-4" />}
                onClick={handleDownload}
                outline
                className="text-xs border-none"
            />
            <BtnNeutral
                icon={<FaPrint className="w-4 h-4" />}
                label="Imprimir"
                type="button"
                onClick={handlePrint}
                outline
                className="text-xs border-none"
            />
        </div>
    )
}

export default QrCodePetWeb
