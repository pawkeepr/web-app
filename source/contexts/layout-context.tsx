import ParticlesAuth from "~/Components/templates/particles-auth";

import { usePathname } from 'next/navigation';
import VerticalLayouts from "~/Layouts";

type LayoutProps = {
    children: React.ReactNode;
}

const routesAuth = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password', '/logout']

const LayoutAuth = ({ children }: LayoutProps) => {
    return (
        <ParticlesAuth>
            {children}
        </ParticlesAuth>
    )
}

const LayoutDefault = ({ children }: LayoutProps) => {
    const pathname = usePathname()
    if (pathname === '/' || !pathname) {
        return (
            <>{children}</>
        )
    }

    if (routesAuth.includes(pathname as string)) {
        return <LayoutAuth>{children}</LayoutAuth>
    }

    return (
        <VerticalLayouts>
            {children as any}
        </VerticalLayouts>
    )
};

export default LayoutDefault;