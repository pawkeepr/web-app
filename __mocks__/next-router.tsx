import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import type { NextRouter } from 'next/router'
import { vi } from 'vitest'

export const useRouterMock = () => {
    const router = {
        basePath: '',
        pathname: '',
        route: '',
        asPath: '',
        query: {},
        push: vi.fn(),
        replace: vi.fn(),
        reload: vi.fn(),
        back: vi.fn(),
        prefetch: vi.fn(),
        beforePopState: vi.fn(),
        destroy: vi.fn(),
        isFallback: false,
        events: {
            on: vi.fn(),
            off: vi.fn(),
            emit: vi.fn(),
        },
        isReady: true,
        isLocaleDomain: false,
        isPreview: false,
        isPreviewMode: false,
        isSsr: true,
        isWebVitalsEnabled: true,
        locale: '',
        locales: [],
        defaultLocale: '',
        domainLocales: {},
        isReadyLocale: true,
        scroll: {},
        localeConfig: {},
    }

    return router
}

const RouterProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <RouterContext.Provider value={useRouterMock() as unknown as NextRouter}>
            {children}
        </RouterContext.Provider>
    )
}

export default RouterProvider
