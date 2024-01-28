import type { ImageProps, StaticImageData } from 'next/image'
import Image from 'next/image'
import { memo, useState } from 'react'

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

    return (
        <>
            <Image
                {...rest}
                src={src}
                onLoad={() => setLoading(true)}
                onError={() => setError(true)}
                onLoadingComplete={() => setLoading(false)}
                alt={alt}
                className={className}
                style={{
                    display: error || loading ? 'none' : 'block',
                    ...style,
                }}
            />
            {(error || loading) && (
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

export default memo(MyImage)
