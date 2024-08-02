import axios from 'axios'
import fs from 'node:fs'
import { getSignedUrl } from '~/services/helpers/profile'

type UploadToS3 = {
    filePath: string
    fileName: string
    size: number
}

export const uploadToS3 = async (img: UploadToS3) => {
    const { data } = await getSignedUrl()
    const image = fs.readFileSync(img.filePath)

    await axios.put(data.url, image, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'image/jpeg',
            'Content-Length': image.length,
        },
    })

    return {
        status: 200,
        message: {
            fileName: data.fileName,
        },
    }
}
