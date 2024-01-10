import { Amplify, Auth } from 'aws-amplify'

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: process.env.IDENTITY_POOL_ID || '',
        // REQUIRED - Amazon Cognito Region
        region: process.env.REGION || 'east-1',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.USER_POOL_ID || 'us-east-1_PDrf1BmAs',
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId:
            process.env.USER_POOL_WEB_CLIENT_ID || '3g4amih96ugs9e0ucd4a7fcudp',
        // other configuration
    },
})

// You can get the current config object
const currentConfig = Auth.configure()

export default currentConfig
