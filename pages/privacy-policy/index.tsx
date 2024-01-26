import NavbarServiceTerms from '~/Components/molecules/nav-bar-service-terms'
import PrivacyPolicy from '~/pages/PrivacyPolicy'
import LandingLayout from '~/pages/_layouts/landing/landing'

const ServiceTerms = () => {
    return (
        <LandingLayout navBar={NavbarServiceTerms}>
            <PrivacyPolicy />
        </LandingLayout>
    )
}

export default ServiceTerms
