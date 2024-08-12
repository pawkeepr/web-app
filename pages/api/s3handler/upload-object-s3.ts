import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import { uploadToS3 } from '~/api/services/upload-to-s3'
import type { FileTypePossible } from '~/services/helpers/profile'

type ResponseData = {
    fileName: string | null
    message?: string
}

type ResponseFormidable = {
    fields: formidable.Fields
    files: formidable.Files
    err: any
}

const POST = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    try {
        const form = formidable({ uploadDir: '/tmp/' })

        const response: ResponseFormidable = await new Promise((resolve) => {
            form.parse(req, (err, fields, files) => {
                resolve({ err, fields, files })
            })
        })

        if (response.err) {
            return res.status(500).json({ fileName: null, message: response.err })
        }

        if (!response.files.file || response.files.file.length === 0) {
            return res
                .status(400)
                .json({ fileName: null, message: 'File not found' })
        }

        const [file] = response.files.file
        const { mimeType } = response.fields as { mimeType: string[] }

        const { message, status } = await uploadToS3({
            fileName: file.newFilename,
            filePath: file.filepath,
            mimeType: mimeType[0] as FileTypePossible,
            size: file.size,
        })

        return res.status(status).json({
            fileName: message.fileName,
            message: 'File uploaded successfully',
        })
    } catch (err) {
        return res.status(500).json(err as ResponseData)
    }
}

const router = createRouter<NextApiRequest, NextApiResponse>()

router.post((req, res) => POST(req, res))
export const config = {
    api: {
        externalResolver: true,
        bodyParser: false,
        responseLimit: false,
        timeout: false,
    },
}

export default router.handler({
    onError: (err, _req, res) => {
        console.error(err?.stack)
        res.status(err?.statusCode || 500).end(
            err?.message || 'Internal Server Error',
        )
    },
})
