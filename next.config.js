require('dotenv').config()

/**@type {import('next').NextConfig} */
const nextConfig = ((phase) => {
    const isProduction = phase === 'production'

    const _currentURL = isProduction ? process.env.API_URL : 'http://localhost:5000'

    return {
        publicRuntimeConfig: {
            publicRoutes: ['/sign-in', '/sign-up', '/forget-password', '/reset-password', '/'],
        },
        images: {
            domains: ['localhost', 'cloudflare-ipfs.com', 'loremflickr.com'],
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
            API_URL: _currentURL,
            SECRET_KEY: process.env.SECRET_KEY,
            REGION: process.env.REGION,
            USER_POOL_ID: process.env.USER_POOL_ID,
            USER_POOL_WEB_CLIENT_ID: process.env.USER_POOL_WEB_CLIENT_ID,
        },
    }
})(process.env.NODE_ENV)

module.exports = nextConfig
