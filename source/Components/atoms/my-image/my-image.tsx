import type { ImageProps, StaticImageData } from 'next/image'
import { useState } from 'react'

import { IoPersonCircle } from 'react-icons/io5'
import { twMerge } from 'tailwind-merge'

type MyImageProps = {
    width?: number
    height?: number
    fill?: boolean
    src: string | StaticImageData
} & ImageProps

const MyImage = ({ src, alt, style, className, ...rest }: MyImageProps) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const isPublicImage = typeof src === 'string' && src.startsWith('/')

    return (
        <>
            {src && <img
                {...rest}
                src={src as string}
                onError={() => setError(true)}
                onLoadedData={() => setLoading(false)}
                onLoadStart={() => setLoading(true)}
                alt={alt}
                className={className}
                style={{
                    display:
                        !isPublicImage && (error || loading) ? 'none' : 'block',
                    ...style,
                }}
            />}
            {!src && (error || loading) && (
                <IoPersonCircle className={
                    twMerge('text-white', className)
                } />
            )}
        </>
    )
}

export default MyImage
