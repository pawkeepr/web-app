import isWebview from 'is-ua-webview'

const Env = () => {
    const isView = window?.navigator?.userAgent
        ? isWebview(window?.navigator?.userAgent)
        : false

    const FLAG_DEV =
        window?.location?.host?.startsWith('development') ||
        window?.location?.host?.startsWith('localhost') ||
        process.env.FLAG_DEV

    const keys = {
        FLAG_DEV,
        API_URL: process.env.REACT_APP_API_URL || '',
        API_FILE_URL: process.env.REACT_APP_API_FILE_URL || '',
        SECRET_KEY: process.env.SECRET_KEY || '',
        IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID || '',
        REGION: process.env.REGION || '',
        USER_POOL_ID: process.env.USER_POOL_ID || '',
        MODE_PROFILE: process.env.MODE_PROFILE || 'tutor',
        USER_POOL_WEB_CLIENT_ID: process.env.USER_POOL_WEB_CLIENT_ID || '',
        EXTERNAL_URL: process.env.EXTERNAL_URL || '',
        WEBVIEW: isView,
    } as const
    type Keys = keyof typeof keys

    const get = (key: Keys) => {
        return keys[key] as (typeof keys)[keyof typeof keys]
    }

    return {
        get,
    }
}

export default Env
