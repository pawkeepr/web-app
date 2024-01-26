import NavbarServiceTerms from '~/Components/molecules/nav-bar-service-terms'
import PrivacyPolicy from '~/pages/PrivacyPolicy'
import LandingLayout from '~/pages/_layouts/landing/landing'

const ServiceTerms = () => {
    return (
        <LandingLayout navBar={NavbarServiceTerms} title="Política de Privacidade">
            <PrivacyPolicy />
        </LandingLayout>
    )
}

export default ServiceTerms
