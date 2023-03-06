/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react'
import check from 'vite-plugin-checker'

import { config } from 'dotenv'
import path from 'path'

config()

export default defineConfig({
	root: __dirname,
	plugins: [
		react(),
		check({
			typescript: true,
		})
	],
	test: {
		setupFiles: './setupTests.ts',
		globals: true,
		environment: 'jsdom',  // <==
		coverage: {
			provider: 'istanbul', // or 'c8'
			include: ['source/**/*.{ts,tsx}'],
			all: true,
		},
		reporters: ['html', 'default'],
		testTimeout: 5000000,
		exclude: [
			'**/node_modules/**',
			'**/.next/**',
			'**/.docker/**'
		],
	},
	resolve: {
		alias: {
			'~/': path.resolve(__dirname, 'source')
		},
	},
})
