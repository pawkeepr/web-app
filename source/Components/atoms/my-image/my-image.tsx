import type { ImageProps, StaticImageData } from 'next/image'
import Image from 'next/image'
import { useState } from 'react'

import user from '~/assets/images/users/user-dummy-img.jpg'

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
            <Image
                {...rest}
                src={src}
                onError={() => setError(true)}
                onLoadedData={() => setLoading(false)}
                onLoadingComplete={() => setLoading(false)}
                onLoadStart={() => setLoading(true)}
                alt={alt}
                className={className}
                style={{
                    display:
                        !isPublicImage && (error || loading) ? 'none' : 'block',
                    ...style,
                }}
            />
            {!isPublicImage && (error || loading) && (
                <Image
                    {...rest}
                    src={user}
                    alt="Default Profile Image"
                    className={className}
                    style={{
                        display: error || loading ? 'block' : 'none',
                    }}
                />
            )}
        </>
    )
}

export default MyImage
