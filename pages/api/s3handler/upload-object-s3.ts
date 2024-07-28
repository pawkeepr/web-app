import type { NextApiRequest, NextApiResponse } from 'next'
import { apiFile } from '~/services/api'
import { GetSignedUrl } from '~/services/helpers/profile'

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
        }
    })

    return { status: 200, message: {
        filename: data.filename
    } }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    switch (req.method) {
        case 'PUT':
            try {
                const response = await uploadToS3(req.body)

                return res.status(response.status).json(response.message)
            } catch (err) {
                return res.status(err.status).json(err as ResponseData)
            }
        default:
            return res.status(405).json({ message: 'Method not allowed', filename: null })
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
