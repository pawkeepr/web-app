import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    switch (req.method) {
        case 'GET':
            return res.status(200).json({ message: 'Health Check!' })
       
        default:
            return res.status(405).json({ message: 'Method not allowed' })
    }
}

