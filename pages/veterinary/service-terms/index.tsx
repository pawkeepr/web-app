import { useEffect } from 'react'
import NavbarServiceTerms from '~/Components/molecules/nav-bar-service-terms'
import useModeProfile from '~/hooks/use-mode'
import LandingLayout from '~/pages/Modules/_layouts/landing/landing'
import TermsOfUse from '~/pages/Modules/veterinary/TermsOfUse'
import { ModeProfile } from '~/types/profile'

const ServiceTerms = () => {
    const { onChangeModeProfile } = useModeProfile()

    useEffect(() => {
        onChangeModeProfile(ModeProfile.vet)
    }, [])

    return (
        <LandingLayout navBar={NavbarServiceTerms} title="Termos de Uso">
            <TermsOfUse />
        </LandingLayout>
    )
}

export default ServiceTerms
