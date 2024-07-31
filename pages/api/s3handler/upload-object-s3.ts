import type { NextApiRequest, NextApiResponse } from 'next'
import type { KEYS_TYPE_USERS } from '~/services/helpers/feedback'
import { updateProfilePictureV2, uploadToS3 } from '~/services/helpers/profile'

type ResponseData = {
    filename: string | null
    message?: string
}

const POST = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    try {
        const response = await uploadToS3(req.body)
        const { user_id, user_type } = req.query as {
            user_id: string
            user_type: KEYS_TYPE_USERS
        }

        if (response.status !== 200) {
            return res.status(response.status).json(response.message)
        }

        const { filename } = response.message

        if (!filename) {
            return res
                .status(500)
                .json({ message: 'Something went wrong' } as ResponseData)
        }

        const responseProfile = await updateProfilePictureV2(
            {
                object_name: filename,
            },
            user_type,
            user_id,
        )

        if (responseProfile.status !== 200) {
            return res.status(responseProfile.status).json(responseProfile.data)
        }

        return res.status(response.status).json(response.message)
    } catch (err) {
        return res.status(500).json(err as ResponseData)
    }
}

const HTTP_REQUEST = {
    POST,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    const fn = HTTP_REQUEST[req.method as keyof typeof HTTP_REQUEST]

    if (!fn) {
        return res
            .status(405)
            .json({ message: 'Method not allowed' } as ResponseData)
    }

    return fn(req, res)
}

export const config = {
    api: {
        externalResolver: true,
        bodyParser: {
            sizeLimit: '10mb',
        },
        responseLimit: false,
        timeout: false,
    },
}
