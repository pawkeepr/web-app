import type { NextApiRequest, NextApiResponse } from 'next'
import { apiFile } from '~/services/api'
import type { GetSignedUrl } from '~/services/helpers/profile'

type ResponseData = {
    filename: string | null
    message?: string
}

const uploadToS3 = async (img: string) => {
    const { data } = await apiFile.get<GetSignedUrl>('/api/get-file-signed-url/')

    const image = Buffer.from(img, 'base64')

    await fetch(data.url, {
        method: 'PUT',
        body: image,
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'image/jpeg',
            'Content-Length': image.length.toString(),
        },
    })

    return {
        status: 200,
        message: {
            filename: data.filename,
        },
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    if (req.method === 'GET') {
        return res.status(200).json({ filename: 'Health Check!' })
    }

    if (req.method === 'POST') {
        try {
            const response = await uploadToS3(req.body)
            return res.status(response.status).json(response.message)
        } catch (err) {
            return res.status(err.status).json(err as ResponseData)
        }
    }
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
