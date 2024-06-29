import { Amplify } from 'aws-amplify'

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        Cognito: {
            identityPoolId: process.env.IDENTITY_POOL_ID as string,
            userPoolId: process.env.USER_POOL_ID as string,
            userPoolClientId: process.env.USER_POOL_CLIENT_ID as string,
            allowGuestAccess: false,
        },
        // other configuration
    },
})

// You can get the current config object
const currentConfig = Amplify.getConfig()

export default currentConfig
