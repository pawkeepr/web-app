import Env from '~/env'
import QrCodePetMobile from './qr-code-pet.mobile'
import QrCodePetWeb from './qr-code-pet.web'

export type QrCodePetProps = {
    id_pet: string
    name_pet: string
}

const QrCodePet = (props: QrCodePetProps) => {
    const mobile = Env().get('WEBVIEW')

    if (mobile) {
        return <QrCodePetMobile {...props} />
    }

    return <QrCodePetWeb {...props} />
}

export default QrCodePet
