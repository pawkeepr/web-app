require('dotenv').config()

/**@type {import('next').NextConfig} */
const nextConfig = ((phase) => {
    const isProduction = phase === 'production'

    const _currentURL = 'https://z4etzps20a.execute-api.us-east-1.amazonaws.com/development'

    return {
        publicRuntimeConfig: {
            publicRoutes: ['/sign-in', '/sign-up', '/forget-password', '/reset-password', '/'],
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
            API_URL: _currentURL,
            SECRET_KEY: process.env.SECRET_KEY,
            REGION: process.env.REGION,
            USER_POOL_ID: process.env.USER_POOL_ID,
            USER_POOL_WEB_CLIENT_ID: process.env.USER_POOL_WEB_CLIENT_ID,
        },
    }
})(process.env.NODE_ENV)

module.exports = nextConfig
