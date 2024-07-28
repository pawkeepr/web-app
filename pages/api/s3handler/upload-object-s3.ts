import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSignedUrl } from '~/services/helpers/profile'

type ResponseData = {
    message: string
}

const uploadToS3 = async (img: string) => {
    const { data } = await getSignedUrl()

    const image = Buffer.from(img, 'base64')

    try {
        return await axios.put(data.url, image, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'image/jpeg',
                'Content-Length': image.length,
            },
        })
    } catch (e) {
        console.log(e)
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    switch (req.method) {
        case 'PUT':
            await uploadToS3(req.body)
            return res.status(200).json({ message: 'Success!' })
        default:
            return res.status(405).json({ message: 'Method not allowed' })
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}
