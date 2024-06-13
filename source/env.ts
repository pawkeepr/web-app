export const Env = () => {
    const FLAG_DEV = window?.location?.host?.startsWith('development') || window?.location?.host?.startsWith('localhost')
    const keys = {
        FLAG_DEV,
        API_URL: process.env.REACT_APP_API_URL || '',
        SECRET_KEY: process.env.SECRET_KEY || '',
        REGION: process.env.REGION || '',
        USER_POOL_ID: process.env.USER_POOL_ID || '',
        USER_POOL_WEB_CLIENT_ID: process.env.USER_POOL_WEB_CLIENT_ID || '',
    } as const
    type Keys = keyof typeof keys

    const get = (key: Keys) => {
        return keys[key] as typeof keys[keyof typeof keys]
    }

    return {
        get
    }
}