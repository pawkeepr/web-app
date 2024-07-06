import { Amplify } from 'aws-amplify'

Amplify.configure({
    Auth: {
        Cognito: {
            identityPoolId: process.env.IDENTITY_POOL_ID as string,
            userPoolClientId: process.env.USER_POOL_WEB_CLIENT_ID as string,
            userPoolId: process.env.USER_POOL_ID as string,
            passwordFormat: {
                minLength: 8,
                requireLowercase: true,
                requireNumbers: true,
                requireUppercase: true,
                requireSpecialCharacters: true,
            },
            loginWith: {
                email: true,
                username: true,
            },
        },
    },
    // other configuration
})

// You can get the current config object
const currentConfig = Amplify.getConfig()

export default currentConfig
