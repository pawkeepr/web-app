import NavbarServiceTerms from '~/Components/molecules/nav-bar-service-terms'
import LandingLayout from '~/pages/Modules/_layouts/landing/landing'
import TermsOfUse from '~/pages/Modules/tutor/TermsOfUse'

const ServiceTerms = () => {
    return (
        <LandingLayout
            navBar={NavbarServiceTerms}
            title="Termos de Uso"
            mode="tutor"
        >
            <TermsOfUse />
        </LandingLayout>
    )
}

export default ServiceTerms
