import axios from 'axios'
import { getSignedUrl } from './profile'

export const uploadJpegToS3 = async (image: string) => {
    const imageFile = Buffer.from(image, 'base64')
    const { data } = await getSignedUrl()

    return await axios.put(data.url, imageFile, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'image/jpg',
            'Content-Length': imageFile.length,
        },
    })
}
