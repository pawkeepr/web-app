/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

import { config } from 'dotenv'
import { URL, fileURLToPath } from 'node:url'
import check from 'vite-plugin-checker'

config()

export default defineConfig({
    root: __dirname,
    plugins: [
        check({
            typescript: false,
        }),
    ],
    optimizeDeps: {
        include: ['@headlessui/react', 'tailwind-variants'],
    },
    test: {
        coverage: {
            provider: 'istanbul', // or 'c8'
            include: ['source/**/*.{ts,tsx}'],
            exclude: [],
            all: true,
            reporter: ['html', 'text-summary', 'json-summary'],
        },
        reporters: ['html', 'default'],
        testTimeout: 5000000,
        exclude: ['**/node_modules/**', '**/.next/**', '**/.docker/**'],
    },
    resolve: {
        alias: {
            '~': fileURLToPath(new URL('./source', import.meta.url)),
        },
    },
})
