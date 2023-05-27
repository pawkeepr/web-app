import { Amplify, Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: process.env.IDENTITY_POOL_ID,
        // REQUIRED - Amazon Cognito Region
        region: process.env.REGION,
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.USER_POOL_ID,
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
        // other configuration
    },
});


// You can get the current config object
const currentConfig = Auth.configure();

export default currentConfig;