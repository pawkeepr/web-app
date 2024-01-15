import ParticlesAuth from '~/Components/templates/particles-auth'

import { usePathname } from 'next/navigation'
import VerticalLayouts from '~/Layouts'

type LayoutProps = {
    children: React.ReactNode
}

const routesAuth = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
    '/logout',
    '/confirm-account',
]

const routesPublics = ['/client/confirmation']

const routesPrivates = ['/activation']

const LayoutAuth = ({ children }: LayoutProps) => {
    return <ParticlesAuth>{children}</ParticlesAuth>
}

const isPublicRoute = (pathname: string) => {
    const isPublic = [...routesAuth, ...routesPublics, ...routesPrivates].find(
        (route) => {
            if (route === '/') {
                return route === pathname
            }

            if (typeof pathname !== 'string') return true

            return pathname?.startsWith(route)
        },
    )

    return !!isPublic
}

const LayoutDefault = ({ children }: LayoutProps) => {
    const pathname = usePathname()

    if (pathname === '/' || !pathname) {
        return <>{children}</>
    }

    if (isPublicRoute(pathname as string)) {
        return <LayoutAuth>{children}</LayoutAuth>
    }

    return <VerticalLayouts>{children}</VerticalLayouts>
}

export default LayoutDefault
