import { vi } from "vitest";

vi.mock('@tanstack/react-query-devtools', () => ({
    ReactQueryDevtools: () => null,
}))