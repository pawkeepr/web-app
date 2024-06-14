import NavbarServiceTerms from '~/Components/molecules/nav-bar-service-terms'
import LandingLayout from '~/pages/Modules/_layouts/landing/landing'
import PrivacyPolicy from '~/pages/Modules/veterinary/PrivacyPolicy'

const ServiceTerms = () => {
    return (
        <LandingLayout
            navBar={NavbarServiceTerms}
            title="Política de Privacidade"
            mode="vet"
        >
            <PrivacyPolicy />
        </LandingLayout>
    )
}

export default ServiceTerms
