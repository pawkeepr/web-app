// Por mais que indique erro no import, ele é necessário para a configuração do vitest e não deve ser removido ou alterado, contudo, ele existe e o lint acusa erro, mas não é um erro real
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
            testNamePattern: 'Unit', // Não remover, pois é utilizado para identificar os testes unitários e
            // mesmo que indique erro, ele faz parte da configuração do vitest
            environment: 'jsdom',
            testTimeout: 5000000,
            exclude: ['**/node_modules/**', '**/.next/**', '**/.docker/**'],
        },
    },
    {
        plugins: [react_swc()],
        extends: 'vite.config.mts',

        test: {
            name: 'integration',
            setupFiles: ['./setupTests.ts', './setupMocks.ts'],
            globals: true,
            testNamePattern: 'Integration', // Não remover, pois é utilizado para identificar os testes unitários e
            // mesmo que indique erro, ele faz parte da configuração do vitest
            environment: 'jsdom',
            testTimeout: 5000000,
            exclude: ['**/node_modules/**', '**/.next/**', '**/.docker/**'],
        },
    },
    {
        plugins: [
            react(),
            storybookTest({
                tags: {
                    include: ['test'],
                    exclude: ['experimental'],
                },
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
                name: 'firefox',
                provider: 'playwright',
                // https://playwright.dev
                providerOptions: {},
            },
            setupFiles: ['./.storybook/vitest.setup.ts'],
        },
    },
])
