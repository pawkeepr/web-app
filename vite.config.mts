/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react-swc'
import check from 'vite-plugin-checker'

import { config } from 'dotenv'
import { URL, fileURLToPath } from 'node:url'

config()

export default defineConfig({
    root: __dirname,
    plugins: [
        react(),
        check({
            typescript: false,
        }),
    ],
    optimizeDeps: {
        include: ['@headlessui/react', 'tailwind-variants'],
    },
    test: {
        setupFiles: ['./setupTests.ts', './setupMocks.ts'],
        globals: true,
        environment: 'jsdom', // <==
        coverage: {
            provider: 'istanbul', // or 'c8'
            include: ['source/**/*.{ts,tsx}'],
            exclude: ['source/**/*.stories.{ts,tsx}'],
            all: true,
        },
        reporters: ['html', 'default'],
        testTimeout: 5000000,
        exclude: [
            '**/node_modules/**',
            '**/.next/**',
            '**/.docker/**',
            'source/**/*.stories.{ts,tsx}',
        ],
    },
    resolve: {
        alias: {
            '~': fileURLToPath(new URL('./source', import.meta.url)),
        },
    },
})
