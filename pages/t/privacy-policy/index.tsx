import { useEffect } from 'react'
import NavbarServiceTerms from '~/Components/molecules/nav-bar-service-terms'
import useModeProfile from '~/hooks/use-mode'
import LandingLayout from '~/pages/Modules/_layouts/landing/landing'
import PrivacyPolicy from '~/pages/Modules/tutor/PrivacyPolicy'
import { ModeProfile } from '~/types/profile'

const ServiceTerms = () => {
    const { onChangeModeProfile } = useModeProfile()

    useEffect(() => {
        onChangeModeProfile(ModeProfile.tutor)
    }, [])
    return (
        <LandingLayout navBar={NavbarServiceTerms} title="Política de Privacidade">
            <PrivacyPolicy />
        </LandingLayout>
    )
}

export default ServiceTerms
