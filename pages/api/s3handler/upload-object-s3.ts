import type { NextApiRequest, NextApiResponse } from 'next'
import { uploadToS3 } from '~/services/helpers/profile'

type ResponseData = {
    fileName: string | null
    message?: string
}

const POST = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    try {
        const response = await uploadToS3(req.body)

        if (response.status !== 200) {
            return res.status(response.status).json(response.message)
        }

        const { fileName } = response.message

        if (!fileName) {
            return res
                .status(500)
                .json({ message: 'Something went wrong' } as ResponseData)
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
