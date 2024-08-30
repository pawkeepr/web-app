require('dotenv').config()

const { i18n } = require('./next-i18next.config')
const webpack = require('webpack')

const withPWA = require('next-pwa')({
    dest: 'public',
})

/**@type {import('next').NextConfig} */
const nextConfig = ((_phase) => {
    // const isProduction = phase === 'production'

    return {
        publicRuntimeConfig: {
            publicRoutes: [
                '/sign-in',
                '/sign-up',
                '/forget-password',
                '/reset-password',
                '/',
                '/search',
                '/client/confirmation/[id]',
                '/pet-was-found/[id_pet]',
                '/pet-was-verify/[id_pet]',
                '/tutor/privacy-policy',
                '/tutor/service-terms',
                // '/tutor/cookie-policy',
                '/veterinary/privacy-policy',
                '/veterinary/service-terms',
                // '/veterinary/cookie-policy',
            ],
        },
        redirects: () => {
            // Redirect para dashboard de tutor e veterinário
            const typeProfile = process.env.MODE_PROFILE

            if (!typeProfile) return []

            const destination = typeProfile === 'tutor' ? '/tutor' : '/veterinary'

            return [
                {
                    source: '/dashboard',
                    destination: `${destination}/dashboard`,
                    permanent: true,
                },
                {
                    source: '/logout',
                    destination: `${destination}/logout`,
                    permanent: true,
                },
                {
                    source: '/profile',
                    destination: `${destination}/profile`,
                    permanent: true,
                },
                {
                    source: '/forgot-password',
                    destination: `${destination}/forgot-password`,
                    permanent: true,
                },
                {
                    source: '/confirm-account',
                    destination: `${destination}/confirm-account`,
                    permanent: true,
                },
                {
                    source: '/',
                    destination: `${destination}/sign-in`,
                    permanent: true,
                },
                {
                    source: '/feedback',
                    destination: `${destination}/feedback`,
                    permanent: true,
                },
                {
                    source: '/privacy-policy',
                    destination: `${destination}/privacy-policy`,
                    permanent: true,
                },
                {
                    source: '/service-terms',
                    destination: `${destination}/service-terms`,
                    permanent: true,
                },
            ]
        },
        images: {
            remotePatterns: [
                { hostname: 'loremflickr.com' },
                { hostname: 'avatars.githubusercontent.com' },
                { hostname: 'cloudflare-ipfs.com' },
                { hostname: 'z4etzps20a.execute-api.us-east-1.amazonaws.com' },
                { hostname: 'localhost' },
            ],
        },
        reactStrictMode: true,
        eslint: {
            ignoreDuringBuilds: true,
        },
        typescript: {
            ignoreBuildErrors: true,
        },
        webpack: (config) => {
            switch (process.env.MODE_PROFILE) {
                case 'tutor':
                    config.plugins.push(
                        new webpack.IgnorePlugin({
                            resourceRegExp: /^private-next-pages\/tutor(\/.*)?$/,
                        }),
                    )
                    break
                case 'vet':
                    config.plugins.push(
                        new webpack.IgnorePlugin({
                            resourceRegExp:
                                /^private-next-pages\/veterinary(\/.*)?$/,
                        }),
                    )
                    break
                default:
                    break
            }

            return config
        },
        env: {
            API_URL: process.env.REACT_APP_API_URL,
            API_FILE_URL: process.env.REACT_APP_API_FILE_URL,
            SECRET_KEY: process.env.SECRET_KEY,
            MODE_PROFILE: process.env.MODE_PROFILE,
            REGION: process.env.REGION,
            USER_POOL_ID: process.env.USER_POOL_ID,
            USER_POOL_WEB_CLIENT_ID: process.env.USER_POOL_WEB_CLIENT_ID,
            FLAG_DEV: process.env.FLAG_DEV,
        },
        i18n,

        async rewrites() {
            return [
                {
                    source: '/api/proxy/:path*',
                    destination: `${process.env.REACT_APP_API_URL}/:path*`,
                },
                {
                    source: '/api-file/proxy/:path*',
                    destination: `${process.env.REACT_APP_API_FILE_URL}/:path*`,
                },
            ]
        },
    }
})(process.env.NODE_ENV)

module.exports = withPWA(nextConfig)
