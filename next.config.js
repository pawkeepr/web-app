require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  const isProduction = phase === 'production'

  const _currentURL = isProduction ? process.env.API_URL : 'http://localhost:8000/api/v1/'

  return {

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
      SECRET_KEY: process.env.SECRET_KEY
    },
  }
}

module.exports = nextConfig(process.env.NODE_ENV)
