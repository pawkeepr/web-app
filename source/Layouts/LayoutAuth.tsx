import ParticlesAuth from '~/Components/templates/particles-auth'

type LayoutProps = {
    children: React.ReactNode
}

const LayoutAuth = ({ children }: LayoutProps) => {
    return <ParticlesAuth>{children}</ParticlesAuth>
}

export default LayoutAuth
