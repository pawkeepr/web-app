import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import { storybookNextJsPlugin } from '@storybook/experimental-nextjs-vite/vite-plugin'
import react from '@vitejs/plugin-react'
import react_swc from '@vitejs/plugin-react-swc'
import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
    {
        plugins: [react_swc()],
        extends: 'vite.config.mts',
        test: {
            name: 'unit',
            setupFiles: ['./setupTests.ts', './setupMocks.ts'],
            globals: true,
            environment: 'jsdom', // <==
            testTimeout: 5000000,
            exclude: ['**/node_modules/**', '**/.next/**', '**/.docker/**'],
        },
    },
    // If you want to keep running your existing tests in Node.js, uncomment the next line.
    // 'vite.config.mts',
    {
        plugins: [
            react(),
            storybookTest({
                storybookScript: 'yarn storybook --ci',
            }),
            storybookNextJsPlugin(),
        ],
        extends: 'vite.config.mts',
        test: {
            name: 'storybook',
            include: ['source/**/*.stories.?(m)[jt]s?(x)'],
            browser: {
                enabled: true,
                name: 'chromium',
                provider: 'playwright',
                // https://playwright.dev
                providerOptions: {},
            },
            setupFiles: ['./.storybook/vitest.setup.ts'],
        },
    },
])
