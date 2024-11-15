import { vi } from 'vitest'

vi.mock('next/config', async () => {
    const actual = await vi.importActual('next/config')
    return {
        ...actual,
        default: () => ({
            publicRuntimeConfig: {
                // Add your public runtime config here
            },
        }),
    }
})