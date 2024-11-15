import { vi } from "vitest"
import { useRouterMock } from './next-router'

vi.mock("next/navigation", async () => {
    const actual = await vi.importActual("next/navigation")

    return {
        ...actual as any,
        useRouter: vi.fn(() => useRouterMock()),
    }
})