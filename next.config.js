require('dotenv').config()
const { i18n } = require('./next-i18next.config')

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
        swcMinify: true,
        eslint: {
            ignoreDuringBuilds: true,
        },
        typescript: {
            ignoreBuildErrors: true,
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
                    source: '/api/:path*',
                    has: [
                        {
                            type: 'header',
                            key: 'Authorization'
                        }
                    ],
                    destination: 'https://wqwkbo2249.execute-api.us-east-1.amazonaws.com/testdevelopment/:path*'
                },
                {
                    source: '/api-file/:path*',
                    has: [
                        {
                            type: 'header',
                            key: 'Authorization'
                        }
                    ],
                    destination: 'https://pljngximqe.execute-api.us-east-1.amazonaws.com/development/:path*',
                },
            ]
        }
    }
})(process.env.NODE_ENV)

module.exports = nextConfig
