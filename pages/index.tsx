import NavbarHome from '~/Components/molecules/nav-bar-home'
import HomePage from '~/pages/Home'
import LandingLayout from '~/pages/Modules/_layouts/landing/landing'

const HomePageNext = () => {
    return (
        <LandingLayout title="Bem Vindo" navBar={NavbarHome}>
            <HomePage />
        </LandingLayout>
    )
}

export default HomePageNext
