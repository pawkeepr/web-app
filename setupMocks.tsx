import { QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'

vi.mock('@tanstack/react-query-persist-client', () => ({
    PersistQueryClientProvider: ({ children, client }: any) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    ),
}))
