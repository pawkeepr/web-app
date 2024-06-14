import NavbarServiceTerms from '~/Components/molecules/nav-bar-service-terms'
import useModeProfile from '~/hooks/use-mode'
import LandingLayout from '~/pages/Modules/_layouts/landing/landing'
import PrivacyPolicy from '~/pages/Modules/veterinary/PrivacyPolicy'

const ServiceTerms = () => {
    const { onChangeModeProfile } = useModeProfile()

    onChangeModeProfile('vet')
    return (
        <LandingLayout navBar={NavbarServiceTerms} title="Política de Privacidade">
            <PrivacyPolicy />
        </LandingLayout>
    )
}

export default ServiceTerms
